# Build dependencies for the docs/ site (Jekyll).
#
# GitHub Pages supplies the theme and plugins implicitly, so the site builds
# there without this file. Everywhere else (a local preview, a container image,
# any other host) `jekyll build` aborts with "the jekyll-theme-cayman theme
# could not be found" unless the theme and plugins named in docs/_config.yml are
# actually installed. That is what this Gemfile pins.
#
#   bundle install
#   bundle exec jekyll build --source docs --destination _site   # servable output
#   bundle exec jekyll serve --source docs                       # local preview
source 'https://rubygems.org'

gem 'jekyll', '~> 4.4'

group :jekyll_plugins do
  gem 'jekyll-relative-links', '~> 0.7'
  gem 'jekyll-seo-tag', '~> 2.9'
  gem 'jekyll-sitemap', '~> 1.4'
end

gem 'jekyll-theme-cayman', '~> 0.2'
