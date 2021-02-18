<script>
import BootstrapVue from 'bootstrap-vue';
import * as vueComponents from 'bootstrap-vue/src/components/index';
import { isString, isUndefined } from 'lodash';
import camelCase from 'lodash/camelCase';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import kebabCase from 'lodash/kebabCase';
import merge from 'lodash/merge';
import Vue from 'vue';

import GlBadge from '../../src/components/base/badge/badge.vue';
import GlTable from '../../src/components/base/table/table.vue';
import * as enumConstants from '../../src/utils/constants';
import { getValidationInfoText } from '../../src/utils/validation_utils';

import { gitlabComponents, gitlabChartComponents, componentValidator } from '../all_components';

import { getDocumentationFor } from '../components_documentation';

Vue.use(BootstrapVue);

function getPropDefaultValue(defaultValue) {
  let returnValue = '';
  if (isString(defaultValue)) {
    returnValue = defaultValue;
  }
  if (isFunction(defaultValue) && !isArray(defaultValue)) {
    returnValue = defaultValue();
  }
  if (!isString(defaultValue) && !isUndefined(defaultValue)) {
    returnValue = JSON.stringify(defaultValue);
  }

  if (defaultValue === null || defaultValue === undefined) {
    returnValue = String(defaultValue);
  }

  if (isString(returnValue)) returnValue = returnValue.replace(/"/g, "'");
  return returnValue;
}

export default {
  components: {
    GlTable,
    GlBadge,
  },
  props: {
    componentName: {
      type: String,
      required: false,
      default: 'Link',
      validator: componentValidator,
    },
  },
  computed: {
    actualComponent() {
      if (gitlabComponents[this.componentName]) {
        return Vue.options.components[this.componentName] || {};
      }
      return {};
    },
    importSubDir() {
      if (gitlabChartComponents[this.componentName]) {
        return '/dist/charts';
      }
      return '';
    },
    actualComponentOptions() {
      return this.actualComponent.options || {};
    },
    componentVModel() {
      const { model } = this.actualComponentOptions;

      if (!model) {
        return null;
      }

      return {
        prop: 'value',
        event: 'input',
        ...model,
      };
    },
    documentationInfo() {
      return getDocumentationFor(this.componentName);
    },
    bootstrapComponentName() {
      return this.documentationInfo.bootstrapComponent || '';
    },
    bootstrapComponentLink() {
      return this.bootstrapComponentName.replace('b-', '').toLowerCase();
    },
    bootstrapComponentOptions() {
      const bootstrapRegisterName = this.bootstrapComponentName
        ? this.bootstrapComponentName[0].toUpperCase() +
          camelCase(this.bootstrapComponentName).substr(1)
        : '';
      const bootstrapComponent = vueComponents[bootstrapRegisterName];
      return bootstrapComponent && bootstrapComponent.options ? bootstrapComponent.options : {};
    },
    componentPropertiesFields() {
      return [
        { key: 'prop', label: 'Property' },
        { key: 'type', label: 'Type' },
        { key: 'required', label: 'Required' },
        { key: 'val', label: 'Value' },
      ];
    },
    eventsFields() {
      return [
        { key: 'event', label: 'Event' },
        { key: 'args', label: 'Arguments' },
        { key: 'description', label: 'Description' },
      ];
    },
    componentProperties() {
      const { props } = this.actualComponentOptions;
      if (!props) return [];
      if (this.documentationInfo.propsInfo) {
        merge(props, this.documentationInfo.propsInfo);
      }
      return this.getPropsMap(props);
    },
    bootstrapComponentProperties() {
      const { props } = this.bootstrapComponentOptions;
      if (!props) return [];
      if (this.documentationInfo.bootstrapPropsInfo) {
        merge(props, this.documentationInfo.bootstrapPropsInfo);
      }
      return this.getPropsMap(props);
    },
    displayComponentProperties() {
      let returnProps = Object.assign([], this.componentProperties);
      const bootstrapProps = this.bootstrapComponentProperties;

      if (bootstrapProps && bootstrapProps.length > 0) {
        const applyableBootstrapProps = bootstrapProps.reduce((actualProps, prop) => {
          const checkComp = returnProps.find((checkProp) => checkProp.prop === prop.prop);
          if (!checkComp) {
            // eslint-disable-next-line no-param-reassign, no-underscore-dangle
            prop._cellVariants = { prop: 'info' };
            actualProps.push(prop);
          }
          return actualProps;
        }, []);
        returnProps = returnProps.concat(applyableBootstrapProps);
      }

      return returnProps;
    },
    displayEvents() {
      const events = this.documentationInfo.events || [];
      if (this.componentVModel) {
        const vModelEventIndex = events.findIndex(
          ({ event }) => event === this.componentVModel.event
        );
        if (vModelEventIndex === -1) {
          events.push({
            event: this.componentVModel.event,
            args: [
              {
                arg: this.componentVModel.prop,
              },
            ],
          });
        }
      }
      return events;
    },
    displaySlots() {
      return this.documentationInfo.slots || [];
    },
  },
  methods: {
    getPropsMap: (props) =>
      Object.keys(props).map((prop) => {
        const selProp = props[prop];

        // Copying over values if available from documentation definition
        const propsInfo = {
          prop: kebabCase(prop),
          required: selProp.required,
          additionalInfo: selProp.additionalInfo,
          validationInfo: getValidationInfoText(selProp.validation),
        };

        // Figuring out the actual type of this property
        const baseType = selProp.type || Object;
        if (Array.isArray(baseType)) {
          propsInfo.type = baseType.map((t) => t.name).join(' or ');
        } else {
          propsInfo.type = baseType.name;
        }

        // Getting the defaultValue and setting it then also the value
        if (propsInfo.type === 'Function' && isFunction(selProp.default)) {
          propsInfo.val = selProp.default.toString();
        } else if ('default' in selProp) {
          propsInfo.val = getPropDefaultValue(selProp.default);
        } else {
          propsInfo.val = '';
        }

        // If we have an enum on this property we assign it and look up its values in the constant file
        if (selProp.enum) {
          propsInfo.enum = selProp.enum;
          propsInfo.enumValues = Object.values(enumConstants[selProp.enum]);
        }

        return propsInfo;
      }),
  },
};
</script>

<template>
  <div v-if="actualComponent.options">
    <div v-if="displayComponentProperties.length > 0">
      <h3>Props</h3>
      <gl-table
        :items="displayComponentProperties"
        :fields="componentPropertiesFields"
        small
        head-variant="default"
        striped
      >
        <template #cell(prop)="field">
          <div>
            <span :title="field.item._cellVariants ? 'Inherited from Vue Bootstrap' : ''">
              {{ field.value }}
              <gl-badge
                v-if="componentVModel && field.value === componentVModel.prop"
                variant="info"
              >
                v-model
              </gl-badge>
            </span>
          </div>
        </template>
        <template #cell(required)="data">
          <span v-if="data.value === true">✅</span>
        </template>
        <template #cell(val)="data">
          <code v-if="data.value">
            {{ data.value }}
          </code>
          <template v-if="data.item.validationInfo">({{ data.item.validationInfo }})</template>
          <div v-if="data.item.additionalInfo">
            <i>{{ data.item.additionalInfo }}</i>
          </div>
          <template v-if="data.item.enum">
            <div>
              {{ data.item.enum }}: <i>{{ data.item.enumValues.join(', ') }}</i>
            </div>
          </template>
        </template>
      </gl-table>
    </div>

    <div v-if="displaySlots.length > 0">
      <h4>Slots</h4>
      <gl-table :items="displaySlots" small head-variant="default" striped />
    </div>

    <div v-if="displayEvents.length > 0">
      <h4>Events</h4>
      <gl-table :items="displayEvents" :fields="eventsFields" small head-variant="default" striped>
        <template #cell(event)="field">
          {{ field.value }}
          <gl-badge v-if="componentVModel && field.value === componentVModel.event" variant="info">
            v-model
          </gl-badge>
        </template>
        <template #cell(args)="field">
          <div
            v-for="argument in field.value"
            :key="`event-${field.item.event}-${argument.arg ? argument.arg : 'none'}`"
          >
            <code v-if="argument.arg">{{ argument.arg }}</code>
            <span>{{ argument.description }}</span>
          </div>
        </template>
      </gl-table>
    </div>

    <div v-if="componentVModel">
      <h4>v-model</h4>
      <gl-table
        :items="[componentVModel]"
        :fields="['prop', 'event']"
        small
        head-variant="default"
        striped
      />
    </div>

    <h3>Import</h3>

    <p>
      <code>import { {{ componentName }} } from '@gitlab/ui{{ importSubDir }}';</code>
    </p>

    <template v-if="bootstrapComponentName">
      <h3 id="under-the-hood">vue-bootstrap component</h3>
      <p>
        This component uses
        <a
          :href="`https://bootstrap-vue.org/docs/components/${bootstrapComponentLink}`"
          target="blank"
          ><code>&lt;{{ bootstrapComponentName }}&gt;</code></a
        >
        from vue-bootstrap internally. So please take a look also there at their extensive
        documentation.
      </p>
    </template>
  </div>
  <b-alert v-else show variant="warning">
    No GitLab UI component found with the name {{ componentName }}
  </b-alert>
</template>
