# frozen_string_literal: true

require 'cgi'

GITLAB_PROJECT_ID = 'gitlab'
GITLAB_UI_PROJECT_ID = 'gitlab-ui'

module Gitlab
  module Danger
    class Teammate
      attr_reader :name, :username, :role, :projects

      def initialize(options = {})
        @username = options['username']
        @name = options['name'] || @username
        @role = options['role']
        @projects = options['projects']
      end

      def markdown_name
        "[#{name}](https://gitlab.com/#{username}) (`@#{username}`)"
      end

      def in_project?
        projects&.has_key?(GITLAB_PROJECT_ID) || projects&.has_key?(GITLAB_UI_PROJECT_ID)
      end

      # Traintainers also count as reviewers
      def reviewer?(category)
        !has_capability?(GITLAB_UI_PROJECT_ID, category, :maintainer) &&
          (
            has_capability?(GITLAB_PROJECT_ID, category, :reviewer) ||
            has_capability?(GITLAB_UI_PROJECT_ID, category, :reviewer) ||
            traintainer?(category)
          )
      end

      def traintainer?(category)
        has_capability?(GITLAB_PROJECT_ID, category, :trainee_maintainer) ||
          has_capability?(GITLAB_UI_PROJECT_ID, category, :trainee_maintainer)
      end

      def maintainer?(category)
        has_capability?(GITLAB_PROJECT_ID, category, :maintainer) ||
          has_capability?(GITLAB_UI_PROJECT_ID, category, :maintainer)
      end

      def status
        api_endpoint = "https://gitlab.com/api/v4/users/#{CGI.escape(username)}/status"
        @status ||= Gitlab::Danger::RequestHelper.http_get_json(api_endpoint)
      rescue Gitlab::Danger::RequestHelper::HTTPError, JSON::ParserError
        nil # better no status than a crashing Danger
      end

      # @return [Boolean]
      def available?
        !out_of_office? && has_capacity?
      end

      private

      # @return [Boolean]
      def out_of_office?
        status&.dig('message')&.match?(/OOO/i) || false
      end

      # @return [Boolean]
      def has_capacity?
        status&.dig('emoji') != 'red_circle'
      end

      def has_capability?(project, category, kind)
        capabilities(project).include?("#{kind} #{category}")
      end

      def capabilities(project)
        Array(projects.fetch(project, []))
      end
    end
  end
end
