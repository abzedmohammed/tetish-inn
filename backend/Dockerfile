FROM ruby:3.0.5-alpine

RUN apt-get update -qq && apt-get install -y postgresql-client
RUN bundle config --global frozen 1

WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN bundle install

# ARG RAILS_ENV="production"
# ARG NODE_ENV="production"
# ENV RAILS_ENV="${RAILS_ENV}" \
#     NODE_ENV="${NODE_ENV}" \
#     PATH="${PATH}:/home/ruby/.local/bin:/node_modules/.bin" \
#     USER="ruby"


COPY . .

EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
