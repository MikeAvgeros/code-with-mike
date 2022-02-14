FROM python:3.10.2

RUN apt-get -y install curl \
&& curl -sL https://deb.nodesource.com/setup_16.x | bash \
&& apt-get install nodejs 

WORKDIR /app/backend

COPY ./api/Pipfile /app/api/
RUN pip3 install --upgrade pip -r Pipfile

WORKDIR /app/client

COPY ./client/package.json /app/client/
RUN npm install

COPY . /app/

RUN npm run build

WORKDIR /app/client/build

RUN mkdir root && mv *.ico *.js *.json root

RUN mkdir /app/api/staticfiles

WORKDIR /app

RUN DJANGO_SETTINGS_MODULE=core.settings \
SECRET_KEY=secret_key \
python3 api/manage.py collectstatic --noinput

EXPOSE $PORT

CMD python3 api/manage.py runserver 0.0.0.0:$PORT