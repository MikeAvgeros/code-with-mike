FROM python:3.10.2-alpine3.15

ENV PYTHONUNBUFFERED 1

WORKDIR /app/api

COPY Pipfile /app/api

RUN pip3 install --upgrade pip -r Pipfile

COPY . /app/api

EXPOSE 8000

CMD python3 manage.py runserver 0.0.0.0:8000