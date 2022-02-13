FROM python:3.10.2-alpine3.15
ENV PYTHONUNBUFFERED 1
WORKDIR /api
COPY Pipfile Pipfile
RUN pip3 install -r Pipfile
COPY . .