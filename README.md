# **Code with Mike**

## **Introduction** 

Code with Mike is a full-stack ecommerce web application that sells online coding courses to students and professional developers. I created this site for Milestone Project 4 as part of the Code Institute's Full Stack Software Development course.

Using the principles of UX design, this fully responsive and interactive website was developed using Django with Python on the backend to create a REST API, which is consumed by a client application developed using React with Javascript. I have chosen PostgresSQL as my database of choice to store my site's datasets.

This project uses Stripe's test payment functionality at checkout, rather than actual live payments. To make a test payment, you can use the following card numbers:

| NUMBER                | CARD            | CVC          | DATE            |
| --------------------- |----------------- | ------------ | --------------- |
| 4242424242424242      | Visa             | Any 3 digits | Any future date |
| 5555555555554444      | Mastercard       | Any 3 digits | Any future date |
| 378282246310005       | American Express | Any 4 digits | Any future date |

You can view live project [by clicking here.](https://codewithmike.herokuapp.com/)

## **Project Requirements** 

Build a full-stack ecommerce web application based around business logic used to control a centrally-owned dataset. You will set up an authentication mechanism and provide paid access to the site's data and/or other activities based on the dataset, such as the purchase of a product/service. The website will respond to user actions and alter the way the site displays data/information.

Required Technologies : HTML, CSS, JavaScript, Python, Django, SQL database, Stripe. 

## **Table of Content** 

  - [UX Design](#ux-design)
    - [Strategy](#strategy)
    - [User stories](#user-stories)
    - [Scope](#scope)
    - [Structure](#structure)
    - [Skeleton](#skeleton)
    - [Surface](#surface)
  - [Database](#database)  
    - [Database structure](#database-structure)
    - [Allowed CRUD operations](#allowed-crud-operations)
  - [Technologies Used](#technologies-used)
    - [Languages](#languages)
    - [Database platform and cloud storage](#database-platform-and-cloud-storage)
    - [Libraries and frameworks](#libraries-and-frameworks)
    - [Other technologies](#other-technologies)  
  - [Testing](#testing)
    - [Manual testing](#manual-testing)
    - [User stories implementation](#user-stories-implementation)
    - [Code validation](#code-validation)
    - [Responsiveness and compatibility](#responsiveness-and-compatibility)
    - [Further testing](#further-testing)
    - [Testing methodology](#testing-methodology)
  - [Deployment](#deployment)
    - [Github repository](#github-repository)
    - [Heroku deployment](#heroku-deployment)
    - [Run the project locally](#run-the-project-locally)
   - [Credits](#credits)
     - [Code](#code)
     - [Content](#content)
     - [Media](#media)
     - [Acknowledgments](#acknowledgments)

## **UX Design**

  - ### **Strategy**  

    My Milestone Project 4, Code with Mike, is an MVP for an ecommerce website that allows software development students, hobbyists and professionals alike access high-quality video content and tutor support to help them improve their coding skills and progress their careers.
    
    The purpose of this project is to create a platform that allows users to create, use, read, edit and delete data. In particular, site users can view a wide selection of courses, organised in suitable categories so that they can choose their learning paths. Other students' reviews and ratings are shown in each course's page so they can make an informed decision.
    
    Users can choose to add courses to their wishlist or cart to view or purchase at a later date. They can buy access to a course for an X amount of months using Stripe. Upon successful payment, they can write, edit or delete a review about said course. As this is an MVP site for educational purposes, no access to real courses is provided. 
    
    All users can sign up and login to the website, which gives them access to extra features. They can also update or delete their profile, add a profile image and contact the website owner with feedback or suggestions to improve services.

    - #### **Site owner goals**
      - To develop a financially viable e-commerce web application.
      - To provide a beautiful and user-friendly interface.
      - To provide great user-experience across multiple devices.
      - To increase online presence.
      - To convert interest into sales.

    - #### **Site user goals** 
      - To access a user-friendly website across multiple devices. 
      - To receive clear information about the courses being sold.
      - To buy courses that are of interest.
      - To provide feedback after purchasing a course.
      - To contact and connect with the website owner.

  - ### **User stories** 

    - **Navigation and website experience**
      - As a site user, I want a responsive website so that I can access it on different devices.
      - As a site user, I want to easily navigate across the site so that I can find the information I need.
      - As a site user, I want to view a lists of products with enough information to make informed decisions.
      - As a site user, I want to find out if there are any deals, promotions and offers.
      - As a site user, I want to view reviews and feedback about a product from other buyers.
      - As a site user, I want to contact the website owner to ask questions about their services or offer feedback.

    - **Shopping experience** 
      - As a shopper, I want to view all products available so that I can quickly have an overview of what is on offer.
      - As a shopper, I want to quickly and easily view featured or best-selling products.
      - As a shopper, I want to select the quantity for an item if applicable so I can order what I need.
      - As a shopper, I want to easily update the quantity of products in my cart or delete if I have changed my mind.
      - As a shopper, I want to be able to save my favourite products in a wishlist to view/purchase at a later date.
      - As a shopper, I want to view related items so that I can purchase several in the category of my choice.
      - As a shopper, I want to be able to write a review of a product that I bought or the services that I have received.

    - **Shopping bag and checkout**
      - As a shopper, I want to review items in my shopping bag so that I can adjust quantities ordered.
      - As a shopper, I want to view the total cost of my purchase including VAT before making payment.
      - As a shopper, I want to enter payment information in a safe and secure way so that I can checkout quickly with confidence.
      - As a shopper, I want to be able to remake a failed payment quickly and not have to add all items to cart again.
      - As a shopper, I want to receive confirmation of my order so that I can have a proof of purchase.
      - As a shopper, I want to view previously purchased items.

    - **Registration and account management** 
      - As a site user, I want to register for an account so that I can view my profile, orders, reviews and favourite items.
      - As a site user, I want to receive an email upon succesful registration.
      - As a site user, I want to be able to login and logout so that I can access my profile safely.
      - As a site user, I want to personalize my profile so that I can update my information and profile image.
      - As a site user, I want to be able to easily reset my password if forgotten to access my account.

    - **Admin and site management** 

      - As the site owner, I want to view, add, update or delete the products on the site.
      - As the site owner, I want to view, add, update or delete the collections on the site.
      - As the site owner, I want to view, add, update or delete promotions for certain products.
      - As the site owner, I want to display very good feedback on the landing page to create engagement.
      - As the site owner I want to view all orders placed by the customers.
      - As the site owner I want to view customer feedback in order to improve the products and/or services.
      - As the site owner, I want to be able to edit most of the content, so that I can keep my website up to date and engaging.

  - ### **Scope**
  
    - #### **Feature trade-off**
      This project is developed as a Minimal Viable Product. There will be room for future improvements and releases incorporating additional pages and features as well as improved design, navigation and bug fixes.

    - #### **Current features (Users)**
      - Users can create an account and get a confirmation email.
      - Users can easily login and logout from their account.
      - Users can reset their password and get a confirmation email.
      - Users can personalise their profile, add a profile picture as well as delete their account if they wish.
      - Users can add courses to the cart or save them in a wishlist.
      - Users can update or delete their cart and place an order.
      - Users can make a fake payment using Stripe at checkout and get a confirmation email.
      - Users can view a list of previously purchased courses.
      - Users can add, edit or delete a review about a purchased course as well as view all their reviews.
      - Users can contact the website owner to ask questions or send feedback.
      - Users can view a list of available courses and categories.
      - Users can view promotions and offers.
      - Users can view reviews from other buyers.

    - #### **Current features (Admin)**
      - Admins can create/view/update/delete courses via the admin page.
      - Admins can create/view/update/delete categories via the admin page.
      - Admins can create/view/update/delete promotions via the admin page.
      - Admins can create/view/update/delete reviews via the admin page.
      - Admins can create/view/update/delete orders via the admin page.
      - Admins can create/view/update/delete user accounts via the admin page.
      - Admins can add certain permissions/priviledges to certain groups of users via the admin page.
      - Admins can choose to showcase featured courses, reviews and promotions.
      - Admins can view successful, pending and failed payments in Stripe's dashboard.
      - Admins can receive emails from the site using a custom email account created for this project.
      - Admins can update how http error responses are displayed to the user.

	- #### **Current website features**
      - Display text, images and information in an engaging way.
      - Intuitive and user-friendly navigation and structure.
      - Responsive website that can be accessed from various devices.

    - #### **Future features**
      - Allow users to signup and login using social media accounts.
      - A Stripe receipt emailed to the user.
      - Store customer's card information using Stripe.
      - Allow refunds through the website.
      - More intuitive and customer friendly error messages from the api response, which is displayed in flash messages.
      - A more responsive design with improved UI and layout.

    - #### **Business rules**
      - A category which contains courses cannot be deleted.
      - An order which contains order items cannot be deleted.
      - Payment status on orders will be set as 'pending' upon creation and 'success' upon successful payment.

    - #### **Constraints**
      - Technical skills: The site owner is still learning Python and is new to Django and React which may impact on the successful implementation of the planned features. 
      - Time: Implementing features using new technical skills will require a lot of time and careful planning, especially since the developer is working full-time and still learning.

  - ### **Structure**

    - #### **Website functionality and content**
      - Header: Logo and a collapsible menu with navigational links
      - Home: An overview of what the site provides including featured courses, reviews and current promotions
      - Courses: A list of all the available courses with a course image and short summary
      - Course Details: Detailed information about a course including reviews, and option to add to cart
      - Categories: A list of all available categories including a short summary
      - Category Details: Detailed information about a category including links to all associated courses
      - Wishlist: Display items added in the wishlist including the option to add them to cart or delete them
      - Shopping cart: Display items added in the cart including the option to update them, delete them or checkout
      - Checkout: A payment form using Stripe that lets users pay for their order
      - Signup: A signup form to create a new account
      - Login: A login form to access your account
      - Password Reset: A password reset form that emails users details on how to reset their password
      - Password Reset Confirm: A password confirmation form to choose your new password
      - Profile: Display user's personal info and a form to update them
      - Profile Delete: A profile delete form to delete your account
      - Orders: Display previously purchased courses and order information
      - Reviews: Dislay all reviews written by user and a way to update or delete them
      - Contact: A contact form to send emails to site owner
      - Footer: Copyright claim and links to social media

  - ### **Skeleton**

    I have designed the layout of the website using [Material UI](https://mui.com/). I have created low fidelity wireframes for desktop and mobile using [Diagrams](https://app.diagrams.net/) in order to guide me in designing the pages. The design and layout of the website has evolved from the original Balsamiq wireframes. You can view the original low fidelity wireframes below.
    
    - #### **Wireframes**
      You can view all the wireframes I created for this project [on this link.](documentation/wireframes/). 

      Please find below links to a selection of wireframes for the most commonly visited pages.

        - [Home](documentation/wireframes/MS4%20Home%20Desktop.png)
        - [Courses](documentation/wireframes/MS4%20Courses%20Desktop.png) 
        - [Course details](documentation/wireframes/MS4%20CourseDetail%20Desktop.png)
        - [Categories](documentation/wireframes/MS4%20Categories%20Desktop.png) 
        - [Category details](documentation/wireframes/MS4%20CategoryDetail%20Desktop.png)
        - [Contact](documentation/wireframes/MS4%20Contact%20Desktop.png) 
        - [Signup](documentation/wireframes/MS4%20Signup%20Desktop.png)
        - [Login](documentation/wireframes/MS4%20Login%20Desktop.png) 
        - [Profile](documentation/wireframes/MS4%20Profile%20Desktop.png)


  - ### **Surface**

    - #### **Colour Scheme**
      - I used this [Material Design - Color Tool](https://material.io/resources/color/#!/?view.left=0&view.right=0) to help me pick the right colours for my website.

      - The main colours that I chose are pink, purple, indigo, gray, off-white and black. I believe this combination of colours makes the website look modern.

      - I have used a colour gradient effect that is shared across the page on primary button, card headers and the landing page. The colour used on this effect are primarily pink and purple, however, a combination of indigo and gray is also used.

      - Purple is used as background on most buttons.

      - Pink is used as background on most icons.

      - Off-white is used as the main background of the website.

      - Black is used as background on the header and footer as well as the primary colour for the heading and paragraph text.

    - #### **Typography**
      - I have used [Google Fonts](https://fonts.google.com/) to import my chosen font for the website.

      - The font that I imported is Poppins and the weights are 400, 500, 600. I have used this font as it makes the design look fun and modern, which works well with the colour scheme.

      - Sans Serif is used as the fallback font in case Poppins is not being imported into the site correctly.

      - The text used on category and product details was picked from [codewithmosh](https://codewithmosh.com/) as this was my main reference when designing the website. You can find more information on the Credit section.

    - #### **Images**
      - I used [Flaticon](https://www.flaticon.com/) to gather some images for the site. You can find more information on the Credit section.

      - All product images were picked from [codewithmosh](https://codewithmosh.com/) as this was my main reference when designing the website. You can find more information on the Credit section.

    - #### **Icons**
      - All the icons in the website were picked from the [Material UI Icons page](https://mui.com/components/material-icons/)

      - The choice of icons relates to the page or action. For instance, an icon of an envelope is displayed on the contact page to showcase an email being sent.

[**Table of Content**](#table-of-content)

## **Database**

  - #### **Database structure**

    The diagram below illustrates the database schema used in this project. It was initially used with SQLite during the development process, then migrated to PostgresSQL in production when deployed in Heroku. 

    I have included both the original version from before I started the project and the final version.

    [Original database schema](documentation/database/MS4%20Database%20Schema%20Original.png)

    [Final database schema](documentation/database/MS4%20Database%20Schema%20Final.png)

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
    View all users' details | No | No | Yes |

## **Technologies Used**

  - ### **Languages**
    - [HTML](https://html.spec.whatwg.org/multipage/)
    - [CSS](https://www.w3.org/Style/CSS/Overview.en.html)
    - [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
    - [Python](https://www.python.org/)

  - ### **Database platform and cloud storage**
    - [SQlite](https://www.sqlite.org/index.html): A SQL database provided by default as part of Django that was used during the development process
    - [Heroku PostgresSQL](https://devcenter.heroku.com/articles/heroku-postgresql): A SQL database provided as an add-on by Heroku for storing data that is used in production
    - [Amazon AWS S3](https://aws.amazon.com/s3/): Cloud storage solution used to store images in production
    - [Heroku](https://www.heroku.com/): Used to deploy and run the application in production

  - ### **Libraries and frameworks**
    - [Django](https://www.djangoproject.com/): A Python web development framework
    - [Django REST](https://www.django-rest-framework.org/): A powerful and flexible toolkit for building Web APIs with Django
    - [Django CORS Headers](https://pypi.org/project/django-cors-headers/): A toolkit that allows in-browser requests to your Django application from other origins
    - [Djoser](https://djoser.readthedocs.io/en/latest/): A REST implementation of Django's authentication system
    - [Pillow](https://pypi.org/project/Pillow/): A Python library for extended image processing capabilities
    - [Stripe](https://stripe.com/docs/payments): An API used to securely handle payments 
    - [Whitenoise](https://pypi.org/project/whitenoise/): A Python library for easily serving static files
    - [Gunicorn](https://gunicorn.org/): WSGI HTTP Server to support deployment of Django application
    - [Psycopg2](https://pypi.org/project/psycopg2/): A very popular PostgreSQL database adapter for the Python programming language.
    - [Boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html): Boto is the Amazon Web Services (AWS) SDK for Python.
    - [React](https://reactjs.org/): A Javascript library for building web interfaces
    - [Material UI](https://reactjs.org/): A UI library for React using Google's material design
    - [Axios](https://www.npmjs.com/package/axios): A promise based HTTP client for the browser and node.js
    - [Valtio](https://github.com/pmndrs/valtio): A simple and light-weight proxy-based state management for React

  - ### **Other technologies**
    - [Git](https://git-scm.com/): A version control system for tracking changes in source code during software development
    - [Github](https://github.com): Github provides hosting for software development version control using Git
    - [Diagrams](https://app.diagrams.net/): Used to design the wireframes and database schema for the project
    - [W3C Markup Validation Service](https://validator.w3.org/): Used to check if there are any HTML errors
    - [W3C CSS Validator](https://jigsaw.w3.org/css-validator/): Used to check if there are any CSS errors
    - [WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/): Used to evaluate accessibility of the website
    - [PEP8 online](http://pep8online.com/): Used to validate python syntax
    - [JSHint](https://jshint.com/): Used to validate javascript syntax
    - [Chrome DevTools](https://developer.chrome.com/docs/devtools/): Google inspect was used to test and fix code and page responsiveness
    - [Google lighthouse](https://developers.google.com/web/tools/lighthouse): Google lighthouse was used to assess performance of the site

[**Table of Content**](#table-of-content)

## **Testing**

  - ### **Manual Testing**

    - #### **Signup**   
      I tested that the signup button directs user to the signup page. I tested that an account is created with the correct infomation from the form. I tested that the form validation works if user adds wrong information. I tested that a welcome email is sent to the email address provided and a flash message appears on screen. I tested that after registration, user is redirected to the login page.

    - #### **Password Reset & Password Confirmation**   
      I tested that the password reset button directs user to the password reset page. I tested that an email is sent with a link to the Password Reset Confirmation page. I tested that the links takes you to the correct page. I tested that the form validation works if user adds wrong information. I tested that after confirming new password, user is redirected to the login page and a flash message appears on screen. I tested that a confirmation email of the change is sent to the user.

    - #### **Login**   
      I tested that the login button directs user to the login page. I tested that the form validation works if user adds wrong information. I tested that after logging in, user is redirected to the profile page. I tested that after logging in, the authentication token and customer information are saved in local storage.

    - #### **Logout**   
      I tested that the logout button logs the user out and deletes the authentication token in the database. It also removed all the customer information from the local storage. A flash message appears on screen to inform the User they have logged out.

    - #### **Update Profile**   
      I tested that the profile successfully updates all the info on the database and a flash message appears on screen. All inputs are successfully tested for errors.

    - #### **Delete Profile**   
      I tested that the profile is successfully removed from the database once deleted and a flash message appears on screen.

    - #### **Add to Cart**   
      I tested that the add to cart button correctly adds a product to the cart and a flash message appears on screen.I tested that if you add the same product to the cart, it only updates the quantity.

    - #### **Update Cart**   
      I tested that if you change the quantity of a product in the cart or add new products, the change is updated in the database. 

    - #### **Delete Cart Items**   
      I tested that if you delete a cart item, it also deletes from the database.

    - #### **Add to Wishlist**   
      I tested that only authenticated users can access the wishlist. I tested that the add to wishlist button correctly adds a product to the wishlist abd a flash message appears on screen. I tested that you cannot duplicate a product in the wishlist.

    - #### **Delete Wishlist Items**   
      I tested that if you delete a wishlist item, it also deletes from the database. I tested that if you add a wishlist item to cart, it is deleted from the wishlist.

    - #### **Contact**   
      I tested that the contact button directs User to the contact page. I tested that the form validation works if User adds wrong information. I tested that an email is successfully sent when submitting the form and a flash message appears on screen. I check that user receives a confirmation email.

    - #### **Create Review**   
      I tested that all inputs on the review form are correctly validated and a new review is added to the database with the correct info.

    - #### **Update Review**   
      I tested that the chosen review successfully updates all the info on the database and a flash message appears on screen. All inputs are successfully tested for errors.

    - #### **Delete Review**   
      I tested that the profile is successfully removed from the database once deleted and a flash message appears on screen.

    - #### **Create Order**   
      I tested that the checkout button creates an order from the cart items and updates the database. I tested that it also redirects you to the payment form.

    - #### **View Order History**   
      I tested that Orders button directs user to the orders page. I tested that the orders shown on the page are correct.

    - #### **Payments**   
      I tested that the form validation works if user adds wrong information. I tested that if payment is successful, a flash message appears on screen and user is redirected to the Orders page. I tested that the payment status of the order is marked as Success on the database. I tested that successful and unsuccessful payments who correctly on the Stripe dashboard.

  - ### **User Stories Implementation**

    - **Navigation and website experience**

      - #### **Requirement** 
        - As a site user, I want a responsive website so that I can access it on different devices.
      - #### **Implementation** 
        - This was achieved by adding a grid system and material design. Media queries are used on various elements to change their characteristics depending on screen size to allow for a consistent feel across multiple devices.

      - #### **Requirement** 
        - As a site user, I want to easily navigate across the site so that I can find the information I need.
      - #### **Implementation** 
        - This was achieved by making a consistent design on all the pages, allow enough white space to better digest the information. Text has large enough font size and colour contrast to be easily read. Relevant icons were used to signify what each action is meant to do. A fixed navbar with relevant navigation links as well as buttons with important actions across every page.

      - #### **Requirement** 
        - As a site user, I want to view a list of products with enough information to make informed decisions.
      - #### **Implementation** 
        - This was achieved by adding a courses pages where user can view all available courses with a short summary. In addition to that, a full details page is available upon clicking each course.

      - #### **Requirement** 
        - As a site user, I want to find out if there are any deals, promotions and offers.
      - #### **Implementation** 
        - This was achieved by adding a current promotions section in the home page with links to view discounted courses.

      - #### **Requirement** 
        - As a site user, I want to view reviews and feedback about a product from other buyers.
      - #### **Implementation** 
        - This was achieved by adding a reviews section in each course page as well as a featured reviews section in the home page.

      - #### **Requirement** 
        - As a site user, I want to contact the website owner to ask questions about their services or offer feedback.
      - #### **Implementation** 
        - This was achieved by adding a contact form.

    - **Navigation and website experience**
      - #### **Requirement** 
        - As a shopper, I want to view all products available so that I can quickly have an overview of what is on offer.
      - #### **Implementation** 
        - This was achieved by adding a courses pages where user can view all available courses with a short summary. In addition to that, a full details page is available upon clicking each course.

      - #### **Requirement** 
        - As a shopper, I want to quickly and easily view featured or best-selling products.
      - #### **Implementation** 
        - This was achieved by adding a featured courses section in the home page.
      
      - #### **Requirement** 
        - As a shopper, I want to select the quantity for an item if applicable so I can order what I need.
      - #### **Implementation** 
        - This was achieved by adding a quantity button next to the add to cart button. 
      
      - #### **Requirement** 
        - As a shopper, I want to easily update the quantity of products in my cart or delete them if I have changed my mind.
      - #### **Implementation** 
        - This was achieved by adding a quantity and delete button for each item in the cart.

      - #### **Requirement** 
        - As a shopper, I want to be able to save my favourite products in a wishlist to view/purchase at a later date.
      - #### **Implementation** 
        - This was achieved by creating a wishlist page and an option to save any product to the wishlist.

      - #### **Requirement** 
        - As a shopper, I want to view related items so that I can purchase several in the category of my choice.
      - #### **Implementation** 
        - This was achieved by adding a categories page and each category shows related courses and information about the category.

      - #### **Requirement** 
        - As a shopper, I want to be able to write a review of a product that I bought or the services that I have received.
      - #### **Implementation** 
        - This was achieved by adding a review button on all purchased courses, which can be viewed in the orders page.

    - **Shopping bag and checkout**
      - #### **Requirement** 
        - As a shopper, I want to review items in my shopping bag so that I can adjust quantities ordered.
      - #### **Implementation** 
        - This was achieved by adding a cart page where you can view all your cart items and their quantities.

      - #### **Requirement** 
        - As a shopper, I want to view the total cost of my purchase including VAT before making payment.
      - #### **Implementation** 
        - This was achieved by adding a Total Price on the cart and Pay button.

      - #### **Requirement** 
        - As a shopper, I want to enter payment information in a safe and secure way so that I can checkout quickly with confidence.
      - #### **Implementation** 
        - This was achieved by using Stripe's api, which securely and safely handles online payments.

      - #### **Requirement** 
        - As a shopper, I want to be able to remake a failed payment quickly and not have to add all items to cart again.
      - #### **Implementation** 
        - This was achieved by adding a Retry Payment button on your Order history page.

      - #### **Requirement** 
        - As a shopper, I want to receive confirmation of my order so that I can have a proof of purchase.
      - #### **Implementation** 
        - This was achieved by receiving an email confirming the order number and amount paid.

      - #### **Requirement** 
        - As a shopper, I want to view previously purchased items
      - #### **Implementation** 
        - This was achieved by creating an Orders history page.

    - **Registration and account management**
      - #### **Requirement** 
        - As a site user, I want to register for an account so that I can view my profile, orders, reviews and favourite items.
      - #### **Implementation** 
        - This was achieved by adding a signup page with and easy-to-use form and functionality to create an account.

      - #### **Requirement** 
        - As a site user, I want to receive an email upon succesful registration.
      - #### **Implementation** 
        - This was achieved by sending an email upon successfully registering the user in the database.

      - #### **Requirement** 
        - As a site user, I want to be able to login and logout so that I can access my profile safely.
      - #### **Implementation** 
        - This was achieved by adding a login and logout page with an easy-to-use form.

      - #### **Requirement** 
        - As a site user, I want to personalize my profile so that I can update my information and profile image.
      - #### **Implementation** 
        - This was achieved by adding a form where user can view their current details and update them as they please.

      - #### **Requirement** 
        - As a site user, I want to be able to easily reset my password if forgotten to access my account.
      - #### **Implementation** 
        - This was achieved by adding a reset password page with clear instructions on how to reset user's password.

    - **Admin and site management** 
      - #### **Requirement** 
        - As the site owner, I want to view, add, update or delete the products on the site.
      - #### **Implementation** 
        - This was achieved by allowing all crud operations on products to superusers from the admin page.

      - #### **Requirement** 
        - As the site owner, I want to view, add, update or delete the categories on the site.
      - #### **Implementation** 
        - This was achieved by allowing all crud operations on categories to superusers from the admin page.

      - #### **Requirement** 
        - As the site owner, I want to view, add, update or delete promotions for certain products.
      - #### **Implementation** 
        - This was achieved by allowing all crud operations on promotions to superusers from the admin page.

      - #### **Requirement** 
        - As the site owner, I want to display very good feedback on the landing page to create engagement.
      - #### **Implementation** 
        - This was achieved by marking reviews as featured from the admin page.

      - #### **Requirement** 
        - As the site owner I want to view all orders placed by the customers.
      - #### **Implementation** 
        - This was achieved by showing all order place by the users in the admin page.

      - #### **Requirement** 
        - As the site owner I want to view customer feedback in order to improve the products and/or services.
      - #### **Implementation** 
        - This was achieved by showing all reviews by the users in the admin page. Moreover, admins can view emails from users.

      - #### **Requirement** 
        - As the site owner, I want to be able to edit most of the content, so that I can keep my website up to date and engaging.
      - #### **Implementation** 
        - The content of the entire page can be fully edited from the admin page. Site onwners can choose featured reviews, products and promotions.

    - ### **Code validation**

      - #### **W3C HTML Code Validator**
        I tested every page of my website through the [W3C Markup Validation Service](https://validator.w3.org/) via direct input and returned no errors. 

      - #### **W3C CSS Jigsaw Validator**
        Each CSS file was tested with [W3C CSS Validator](https://jigsaw.w3.org/css-validator/) via direct input and returned no errors.

      - #### **JS Hint**
        I ran all my Javascript files through [JSHint](https://jshint.com/) and returned no errors.

      - #### **Python PEP8**
        I ran all my Python files through [PEP8 online](http://pep8online.com/) and returned no errors, except for settings.py.

    - ### **Responsiveness and Compatibility**

      - The website is compatible with most modern web browsers. For the best viewing experience, I recommend using Chrome, Firefox, Edge or Safari. 

      - The worst viewing experience is on Internet Explorer. I decided to not include any vendor prefixes for IE or make any changes to my code as IE is no longer supported. 

      - I have been constantly testing how responsive my website is by using [Google Development Tools](https://developers.google.com/web/tools), [Am I Responsive](http://ami.responsivedesign.is/) and [Techsini Multi Device Mockup Generator](https://techsini.com/multi-mockup/index.php)

      - Throughout the development process, I have been consistently testing that all the pages work well on different screen sizes and devices. 

      - This has helped me adjust the values on my font sizes so that my fonts are responsive and work well on all screen sizes.

      - This has helped me adjust the width and height of all my images.

      - This has helped me adjust the width and height of my buttons as their size is responsive depending on the screen width.

      - Overall, most of the elements on the website are responsive based on the screen size so being able to view how the website adapts depending on the screen has helped me make suitable decisions, which have improved the User Experience.

      - During the testing phase, I have used Lighthouse to generate reports for both Desktop and Mobile. The reports showed better practices and syntantical fixes on my HTML and CSS, which in turn helped boost the performance, accessibility and UX of the website.

    - ### **Further Testing**

      - The website was viewed and tested on a variety of devices such as Desktop, Laptop, iPad, and a variety of Android and iOs mobile phones. 

      - The website was viewed and tested on a variety of browsers.

        - Chrome
        - Firefox
        - Safari
        - Opera
        - Edge

      - A large amount of testing was done to ensure that all links were working as expected.

      - All buttons were carefully tested to ensure they were linking to the correct page.

      - Friends, family members and other Code Institute students were asked to review the site and documentation to point out any bugs, typos and/or user experience issues.

    - ### **Testing Methodology**

      -  Code changes were carefully tested prior to committing and pushing to GitHub. This was in an attempt to prevent faulty or broken code from being pushed to the repository or deployed to the live site. 

[**Table of Content**](#table-of-content)

## **Deployment**

  - ### **Github Repository**

    The project is stored on Github using the following steps.

    - I logged into my account on GitHub - [My account](https://github.com/MikeAvgeros)

    - I created a public repository for my 4th Milestone project - [codewithmike](https://github.com/MikeAvgeros/code-with-mike)

  - ### **Heroku Deployment**

    The project is deployed on Heroku, directly from the master branch via GitHub. I am using PostgreSQL database to store my data. I am using S3 bucket cloud service on AWS to host my media files.

    The following steps were taken to complete the deployment process.

    - I created an account on Heroku

    - Created Pipfile and Pipfile.lock, to allow Heroku to detect this project as a python 3 app and install all required dependencies and libraries.

    - Created a Procfile using echo web: python app.py > Procfile so Heroku would be informed on which file runs the app and how to run this project.

    - Created a new Heroku app, codewithmike and set its region to Europe and programming language to Python.

    - Automatic deployment was set up on Heroku - On the dashboard, in the deploy menu. Connect to GitHub section. The GitHub repository was searched for and connected to the app.

    - On the settings tab on the dashboard, 'Reveal Config Vars' was used to tell Heroku which environment variables are required to run the app. The following config vars were added:

      - AWS_ACCESS_KEY_ID
      - AWS_SECRET_ACCESS_KEY
      - DATABASE_URL
      - DISABLE_COLLECTSTATIC
      - EMAIL_HOST_PASS
      - EMAIL_HOST_USER
      - SECRET_KEY
      - STRIPE_SECRET_KEY

    - Clicked the Enable Automatic Deploys button located in the Deploy section of Heroku to allow for automatic deploys.

    - Clicked the Deploy Branch button located in the Deploy section of Heroku to finally deploy this project.

    - Clicked the View button to launch this project's app. You can view the live site [here](https://codewithmike.herokuapp.com/).

    - The deployed site on Heroku will get updated automatically with any new commits to the master branch in the GitHub repo.

  - ### **Run the project locally**
    
    To run this project locally on your machine, you can either fork or clone the Github repository following these steps.

    - #### **Clone the repository**
      - Log into GitHub and navigate to the [GitHub repository](https://github.com/MikeAvgeros/code-with-mike)
      - Above the repository folder and file content, click “Code”
      - Copy the clone URL (either the SSH format or the HTTPS)
      - If you are using the SSH protocol, ensure your public key is loaded on the local system to which you are cloning
      - Create a directory on your local system
      - Open the terminal, change into that directory and run ```$ git clone <clone URL>```

    - #### **Run Django app**
   	  - To run the Django app, open your terminal and change directory into the root of the project. Run ```pip install pipenv``` to install pipenv which will allow you to manage your dependencies inside a virtual environment. To create a virtual environment run ```pipenv shell```. Once you have created the virtual environment, run ```pipenv install Pipfile``` to install all the required dependencies and libraries from the Pipfile. Finally, to start the development server, run ```python manage.py runserver```.

    - #### **Run React app**
      - To run the React app, open your terminal and change directory into the client folder. Run ```npm install``` to install all the required node modules from the packages.json file. Once everything is installed, to open a development server for the app, you need to run ```npm start```. If you wish to use the api from the local development server, go into the Api component inside the client folder and change the baseURL from Axios to http://127.0.0.1:8000/api/

    - #### **Run React app from Django**
      - To run the React app from Django, after your have installed all the node modules using ```npm install```, you will need to build the app using ```npm run build```. After that's done, change the direcory back to the root and run ```python manage.py collectstatic``` This will collect all the static files from the build folder. Then to run the Django developement server run ```python manage.py runserver```. This step requires the creation of a virtual environment and installation of all the dependencies as described in the above step.

## **Credits**

  - ### **Code**
    - Before starting my project, I watched Part 2 from Mosh Hamedani's [The Ultimate Django Series](https://codewithmosh.com/p/the-ultimate-django-series). This course inspired how I developed the Django application.

    - While developing the frontend part of the project, I watched the following [Udemy tutorial from Dennis Ivy](https://www.udemy.com/course/django-with-react-an-ecommerce-website). This course inspired how I developed and deployed the application.

  - ### **Media and content**
    - Since the design and idea for my project was heavily influenced by [codewithmosh](https://codewithmosh.com), all the images and content for my courses and categories were taken from that website.
    - The landing page images as well as the logo and favicon were taken from [Freepik at flaticon](https://www.flaticon.com/authors/freepik)
    - All profile images are provided by the website users.
    - All icons are provided by [Material UI](https://mui.com/components/material-icons/).
    - Fonts were provided by [Google Fonts](https://fonts.google.com/).

  - ### **Acknowledgments**
    - I would like to thank my mentor, [Narender Singh](https://www.linkedin.com/in/nar3nd3r/) for his support, guidance and design ideas.
    - I would like to thank the [Code Institute](https://codeinstitute.net/) for the well-thought-out curriculum and their amazing and super informative and helpful Slack community!
    - I would like to thank the students and alumni from the Code Institute London Community WhatsApp group for their helpful input during my development and testing phase.

## **Disclaimer**
  #### This website was made for educational purposes only