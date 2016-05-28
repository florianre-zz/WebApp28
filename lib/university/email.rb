module University
  module Email
    # Rails.root gets the directory of your application (the folder that
    # contains app
    # .join is a concatenation function for file paths i.e. join('config',
    # 'universities.yaml') is equivalent to config/universities.yaml
    UNIVERSITIES = YAML.load_file(Rails.root.join('config', 'universities.yaml'))

    # Verifies that email is a valid english university email
    def self.valid?(email)
      UNIVERSITIES.any? { |uni| email.ends_with?("@#{uni[:domain]}") }
    end
  end
end
