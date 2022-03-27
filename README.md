# **Code with Mike**

## **INTRODUCTION** 

Code with Mike is a full-stack ecommerce web application that sells online coding courses to students and professional developers. I created this site for Milestone Project 4 as part of the Code Institute's Full Stack Software Development course.

Using the principles of UX design, this fully responsive and interactive website was developed using Django with Python on the backend to create a REST API, which is consumed by a client application developed using React with Javascript. I have chosen PostgresSQL as my database of choice to store my site's datasets.

This project uses Stripe's test payment functionality at checkout, rather than actual live payments. To make a test payment, you can use the following card numbers:

| NUMBER                | CARD            | CVC          | DATE            |
| --------------------- |----------------- | ------------ | --------------- |
| 4242424242424242      | Visa             | Any 3 digits | Any future date |
| 5555555555554444      | Mastercard       | Any 3 digits | Any future date |
| 378282246310005       | American Express | Any 4 digits | Any future date |

View live project here [link to deployed website.](https://codewithmike.herokuapp.com/)

## **PROJECT REQUIREMENTS** 

Build a full-stack ecommerce web application based around business logic used to control a centrally-owned dataset. You will set up an authentication mechanism and provide paid access to the site's data and/or other activities based on the dataset, such as the purchase of a product/service. The website will respond to user actions and alter the way the site displays data/information.

Required Technologies : HTML, CSS, JavaScript, Python, Django, SQL database, Stripe. 

## **TABLE OF CONTENT** 

  - [UX Design](#ux-design)
    - [Strategy](#strategy)
    - [User stories](#user-stories)
    - [Scope](#scope)
    - [Structure](#structure)
    - [Skeleton](#skeleton)
    - [Surface](#surface)
  - [Database operations](#database-operations)    
    - [Allowed CRUD operations](#allowed-crud-operations)
  - [Technologies Used](#technologies-used)
    - [Languages](#languages)
    - [Database platform and cloud storage](#database-platform-and-cloud-storage)
    - [Libraries and frameworks](#libraries-and-frameworks)
    - [Other technologies](#other-technologies)  
  - [Testing](#testing)
    - [Introduction](#introduction)
    - [Code validation](#code-validation)
    - [Testing user stories](#testing-user-stories)
    - [Testing responsiveness](#testing-responsiveness)
    - [Testing performance](#testing-performance)
    - [Testing accessibility](#testing-accessibility)
  - [Deployment](#deployment)
    - [Deploy site in Heroku](#deploy-site-in-heroku)
    - [Run the project locally](#run-the-project-locally)
   - [Credits](#credits)
     - [Code](#code)
     - [Content](#content)
     - [Media](#media)
     - [Acknowledgment](#acknowledgments)

## **UX DESIGN**

  - ### **Strategy**  

    My Milestone Project 4, Code with Mike, is an MVP for an ecommerce website that allows software development students, hobbyists and professionals alike access high-quality video content and tutor support to help them improve their coding skills and progress their careers.
    
    The purpose of this project is to create a platform that allows users to create, use, read, edit and delete data. In particular, site users can view a wide selection of courses, organised in suitable categories so that they can choose their learning paths. Other students' reviews and ratings are shown in each course's page so they can make an informed decision.
    
    Users can choose to add courses to their wishlist or cart to view or purchase at a later date. They can buy access to a course for an X amount of months using Stripe. Upon successful payment, they can write, edit or delete a review about said course. As this is an MVP site for educational purposes, no access to real courses is provided. 
    
    All users can sign up and login to the website, which gives them access to extra features. They can also update or delete their profile, add a profile image and contact the website owner with feedback or suggestions to improve services.

  - ### **User stories** 

    - #### **Site owner goals**
      - To develop a financially viable e-commerce web application
      - To provide a beautiful and user-friendly interface
      - To provide great user-experience across multiple devices
      - To increase online presence
      - To convert interest into sales 

    - #### **Site user goals** 
      - To access a user-friendly website across multiple devices 
      - To receive clear information about the courses being sold
      - To buy courses that are of interest
      - To provide feedback after purchasing a course
      - To contact and connect with the website owner

    1. **Navigation and website experience**
      - As a site user, I want a responsive website so that I can access it on different devices
      - As a site user, I want to easily navigate across the site so that I can find the information I need
      - As a site user, I want to view a lists of products with enough information to make informed decisions
      - As a site user, I want to find out if there are any deals, promotions and offers.
      - As a site user, I want to view reviews and feedback about a product from other buyers.
      - As a site user, I want to contact the website owner to ask questions about their services or offer feedback.

    2. **Shopping experience** 
      - As a shopper, I want to view all products available so that I can quickly have an overview of what is on offer
      - As a shopper, I want to quickly and easily view featured or best-selling products.
      - As a shopper, I want to select the quantity for an item if applicable so I can order what I need
      - As a shopper, I want to easily update the quantity of products in my cart or delete if I have changed my mind
      - As a shopper, I want to be able to save my favourite products in a wishlist to view/purchase at a later date
      - As a shopper, I want to view related items so that I can purchase several in the category of my choice.
      - As a shopper, I want to be able to write a review of a product that I bought or the services that I have received

    3. **Shopping bag and checkout**
      - As a shopper, I want to review items in my shopping bag so that I can adjust quantities ordered
      - As a shopper, I want to view the total cost of my purchase including VAT before making payment
      - As a shopper, I want to enter payment information in a safe and secure way so that I can checkout quickly with confidence
      - As a shopper, I want to be able to remake a failed payment quickly and not have to add all items to cart again
      - As a shopper, I want to receive confirmation of my order so that I can have a proof of purchase
      - As a shopper, I want to view previously purchased items

    4. **Registration and account management** 
      - As a site user, I want to register for an account so that I can view my profile, orders, reviews and favourite items
      - As a site user, I want to receive an email upon succesful registration.
      - As a site user, I want to be able to login and logout so that I can access my profile safely 
      - As a site user, I want to personalize my profile so that I can update my information and profile image
      - As a site user, I want to be able to easily reset my password if forgotten to access my account

    5. **Admin and site management** 

      - As the site owner, I want to view, add, update or delete the products on the site
      - As the site owner, I want to view, add, update or delete the collections on the site
      - As the site owner, I want to view, add, update or delete promotions for certain products
      - As the site owner, I want to display very good feedback on the landing page to create engagement
      - As the site owner I want to view all orders placed by the customers
      - As the site owner I want to view customer feedback in order to improve the products and/or services
      - As the site owner, I want to be able to edit most of the content, so that I can keep my website up to date and engaging.

  - ### **Scope**
  
    - #### **Feature trade-off**
      This project is developed as a Minimal Viable Product. There will be room for future improvements and releases incorporating additional pages and features as well as improved design and navigation.

    - #### **Current features (Users)**
      - Users can create an account and get a confirmation email
      - Users can easily login and logout from their account
      - Users can reset their password and get a confirmation email
      - Users can personalise their profile, add a profile picture as well as delete their account if they wish
      - Users can add courses to the cart or save them in a wishlist
      - Users can update or delete their cart and place an order
      - Users can make a fake payment using Stripe at checkout and get a confirmation email
      - Users can view a list of previously purchased courses
      - Users can add, edit or delete a review about a purchased course as well as view all their reviews
      - Users can contact the website owner to ask questions or send feedback
      - Users can view a list of available courses and categories
      - Users can view promotions and offers
      - Users can view reviews from other buyers

    - #### **Current features (Admin)**
      - Admins can create/view/update/delete courses via the admin page
      - Admins can create/view/update/delete categories via the admin page
      - Admins can create/view/update/delete promotions via the admin page
      - Admins can create/view/update/delete reviews via the admin page
      - Admins can create/view/update/delete orders via the admin page
      - Admins can create/view/update/delete user accounts via the admin page
      - Admins can add certain permissions/priviledges to certain groups of users via the admin page
      - Admins can choose to showcase featured courses, reviews and promotions
      - Admins can view successful, pending and failed payments in Stripe's dashboard
      - Admins can receive emails from the site using a custom email account created for this project
      - Admins can update how http error responses are displayed to the user

	  - #### **Current website features**
      - Display text, images and information in an engaging way
      - Intuitive and user-friendly navigation and structure
      - Responsive website that can be accessed from various devices

    - #### **Future features**
      -

    - #### **Business rules**
      - A category which contains courses cannot be deleted
      - An order which contains order items cannot be deleted
      - Orders will be set as 'pending' upon creation and 'success' upon successful payment

    - #### **Constraints**
      - Technical skills: The site owner is still learning Python and is new to Django and React which may impact on the successful implementation of the planned features. 
      - Time: Implementing features using new technical skills will require a lot of time and careful planning, especially since the developer is working full-time and still learning.

  - ### **Structure**

    - #### **Website functionality and content**
      - Header: Logo and a collapsible menu with navigational links
      - Home: An overview of what the site provides including featured courses, reviews and current promotions
      - Courses: A list of available courses
      - Course Details: Detailed information about a course
      - Categories: A list of available categories
      - Category Details: Detailed information about a category
      - Wishlist: Display items added in the wishlist
      - Shopping cart: Display items added in the cart
      - Checkout: A payment form using Stripe
      - Signup: A signup form to create an account
      - Login: A login form to access your account
      - Profile: Display user's personal info and a form to update them
      - Orders: Display previously purchased courses and order information
      - Reviews: Dislay all reviews written by user and a way to update or delete them
      - Contact: A contact form to send emails to site owner
      - Footer: Copyright, links to social media and policies

    - #### **Database structure**

      The diagram below illustrates the database schema used in this project. It was initially used with SQLite during the development process, then migrated to PostgresSQL in production when deployed in Heroku.

      ![Attach db schema](documentation/database/MS4%20Data%20Model%20Chart.png)

  - ### **Skeleton**

    I have designed the layout of the website using ![Material UI](https://mui.com/). I have created low fidelity wireframes for desktop and mobile using ![Diagrams](https://app.diagrams.net/) in order to guide me in designing the pages. The design and layout of the website has evolved from the original Balsamiq wireframes. You can view the original low fidelity wireframes below.
    
    - #### **Wireframes**
      You can view all the wireframes for this project [here](documentation/wireframes/). 

      Please find below links to a selection of wireframes used for this project.

      - #### **Desktop**
        - [Home](documentation/wireframes/desktop/MS4%20Home%20Desktop.png)
        - [Courses](documentation/wireframes/desktop/MS4%20Courses%20Desktop.png) 
        - [Course details](documentation/wireframes/desktop/MS4%20CourseDetail%20Desktop.png)
        - [Categories](documentation/wireframes/desktop/MS4%20Categories%20Desktop.png) 
        - [Category details](documentation/wireframes/desktop/MS4%20CategoryDetail%20Desktop.png)
        - [Contact](documentation/wireframes/desktop/MS4%20Contact%20Desktop.png) 
        - [Signup](documentation/wireframes/desktop/MS4%20Signup%20Desktop.png)
        - [Login](documentation/wireframes/desktop/MS4%20Login%20Desktop.png) 
        - [Profile](documentation/wireframes/desktop/MS4%20Profile%20Desktop.png)

      - #### **Mobile**
        - [Home](documentation/wireframes/desktop/MS4%20Home%20Desktop.png)
        - [Courses](documentation/wireframes/desktop/MS4%20Courses%20Desktop.png) 
        - [Course details](documentation/wireframes/desktop/MS4%20CourseDetail%20Desktop.png)
        - [Categories](documentation/wireframes/desktop/MS4%20Categories%20Desktop.png) 
        - [Category details](documentation/wireframes/desktop/MS4%20CategoryDetail%20Desktop.png)
        - [Contact](documentation/wireframes/desktop/MS4%20Contact%20Desktop.png) 
        - [Signup](documentation/wireframes/desktop/MS4%20Signup%20Desktop.png)
        - [Login](documentation/wireframes/desktop/MS4%20Login%20Desktop.png) 
        - [Profile](documentation/wireframes/desktop/MS4%20Profile%20Desktop.png)

  - ### **Surface**

    - #### **Colour Scheme**

    - #### **Typography**

    - #### **Images**

    - #### **Icons**

## **Database operations**

  - ### **Allowed CRUD operations**
    Operations | all users | authenticated users | superusers |
    --- | --- | --- | --- 
    View courses/categories/promotions | Yes | Yes | Yes |
    Create/update/delete courses | No | No | Yes |
    Create/update/delete categories | No | No | Yes |
    Create/update/delete promotions | No | No | Yes |
    Allow priviledges to other groups | No | No | Yes |
    View/create/update/delete cart | Yes | Yes | Yes |
    View/create/update/delete wishlist | No | Yes | Yes |
    Checkout page | No | Yes | Yes |
    Signup | Yes | No | No |
    Login | No | Yes | Yes |
    Logout | No | Yes | Yes |
    View/update/delete profile | No | Yes | Yes |
    View order history | No | Yes | Yes |
    View order details | No | Yes | Yes |
    View my reviews | No | Yes | Yes |
    View all reviews | Yes | Yes | Yes |
    Create/update/delete a review | No | Yes | Yes |

## **TECHNOLOGIES USED**

  - ### **Languages**
    - [HTML](https://html.spec.whatwg.org/multipage/)
    - [CSS](https://www.w3.org/Style/CSS/Overview.en.html)
    - [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
    - [Python](https://www.python.org/)

  - ### **Database platforms and cloud storage**
    - [SQlite](https://www.sqlite.org/index.html): A SQL database provided by default as part of Django that was used during the development process
    - [Heroku PostgresSQL](https://devcenter.heroku.com/articles/heroku-postgresql): A SQL database provided as an add-on by Heroku for storing data that is used in production
    - [Amazon AWS S3](https://aws.amazon.com/s3/): Cloud storage solution used to store images in production
    - [Heroku](https://www.heroku.com/): Used to deploy and run the application in production

  - ### **Libraries and frameworks**
    - [Django](https://www.djangoproject.com/): A Python web development framework
    - [Django REST](https://www.django-rest-framework.org/): A powerful and flexible toolkit for building Web APIs with Django
    - [Django CORS Headers](https://pypi.org/project/django-cors-headers/) A toolkit that allows in-browser requests to your Django application from other origins
    - [Djoser](https://djoser.readthedocs.io/en/latest/): A REST implementation of Django's authentication system
    - [Pillow](https://pypi.org/project/Pillow/): A Python library for extended image processing capabilities
    - [Stripe](https://stripe.com/docs/payments): An API used to securely handle payments 
    - [Whitenoise](https://pypi.org/project/whitenoise/) A Python library for easily serving static files
    - [Gunicorn](https://gunicorn.org/): WSGI HTTP Server to support deployment of Django application
    - [React](https://reactjs.org/): A Javascript library for building web interfaces
    - [Material UI](https://reactjs.org/): A UI library for React using Google's material design
    - [Axios](https://www.npmjs.com/package/axios) A promise based HTTP client for the browser and node.js
    - [Valtio](https://github.com/pmndrs/valtio) A simple and light-weight proxy-based state management for React

  - ### **Other technologies**
    - [Diagrams](https://app.diagrams.net/) Used to design the wireframes and database schema for the project
    - [W3C Markup Validation Service](https://validator.w3.org/): Used to check if there are any HTML errors
    - [W3C CSS Validator](https://jigsaw.w3.org/css-validator/): Used to check if there are any CSS errors
    - [WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/): Used to evaluate accessibility of the website
    - [PEP8 online](http://pep8online.com/): Used to validate python syntax
    - [JSHint](https://jshint.com/): Used to validate javascript syntax
    - [Chrome DevTools](https://developer.chrome.com/docs/devtools/): Google inspect was used to test and fix code and page responsiveness
    - [Google lighthouse](https://developers.google.com/web/tools/lighthouse): Google lighthouse was used to assess performance of the site

## **TESTING**

## **DEPLOYMENT**