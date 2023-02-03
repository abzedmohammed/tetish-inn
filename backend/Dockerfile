FROM ruby:3.0.5-alpine

# RUN apt-get update -qq && apt-get install -y postgresql-client
RUN bundle config --global frozen 1

WORKDIR /app

COPY Gemfile Gemfile.lock ./

RUN apk add --update \
      binutils-gold \
      build-base \
      curl \
      file \
      g++ \
      gcc \
      git \
      less \
      libstdc++ \
      libffi-dev \
      libc-dev \ 
      linux-headers \
      libxml2-dev \
      libxslt-dev \
      libgcrypt-dev \
      make \
      netcat-openbsd \
      openssl \
      pkgconfig \
      postgresql-dev \
      tzdata

RUN gem install bundler:2.4.4

RUN bundle install


ARG RAILS_ENV=
ARG DATABASE_PASSWORD
ARG CLOUD_NAME
ARG CLOUD_API_KEY
ARG CLOUD_API_SECRET
ARG AWS_RDS_HOST

ENV RAILS_ENV="production"
ENV DATABASE_PASSWORD="Abzedar2"
ENV CLOUD_NAME="abzedmohammed"
ENV CLOUD_API_KEY="547487439672462"
ENV CLOUD_API_SECRET="MQ9WO7z05ZviQeX5ijFDk7WNevI"
ENV AWS_RDS_HOST="tetish-inn.ceqchdg3dyh6.us-east-1.rds.amazonaws.com"

# ARG NODE_ENV="production"
# ENV RAILS_ENV="${RAILS_ENV}" \
#     NODE_ENV="${NODE_ENV}" \
#     PATH="${PATH}:/home/ruby/.local/bin:/node_modules/.bin" \
#     USER="ruby"


COPY . .

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]


# bundle lock --add-platform x86_64-linux-musl