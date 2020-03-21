FROM ubuntu:latest

ENV APP_SETTINGS proj.config.BaseConfig

RUN apt-get update -y
RUN apt-get install -y python3-pip python3-dev build-essential
RUN pip3 install --upgrade pip

COPY . /comic
WORKDIR /comic
RUN pip3 install -r requirements.txt

CMD gunicorn -w 4 -b 0.0.0.0:80 app:app
