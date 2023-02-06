<a name="readme-top"></a>

[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
    <img src="./snack.jpg" alt="Logo" width="100" height="80">
  <h3 align="center">TETISH INN</h3>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<img src="https://res.cloudinary.com/abzedmohammed/image/upload/v1675674539/tetish-inn/tetish-inn_wv7njc.png" alt="Snacks Page" width="100%" height="auto">

This is a snacks ordering application where users can order for snacks and get them delivered to them. The ordered item can also be edited or deleted. The user also has add cash to their accounts browse through different snacks which are filtered from sweet to salty to hot.

What the application does:

* User authenticationa and authorization.
* Viewing snacks based on their type, which are salty, sweet and hot.
* User can add items to cart, remove edit or increment the items quantity

Features under development:

* An admin panel that supports multiple vendors to add products to the application.
* A seller has a dashboard to manage their snacks.
* A user can track their orders and get notified if it has arrived.
* A user can get realtime notifications.
* Snacks can be filtred depending on what the user wants, eg category, name or type.




<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

This application has been built with.

* [![React][React.com]][React-url]
* [![Tailwind][Tailwindcss.com]][Tailwind-url]
* [![Rails][Rails.com]][Rails-url]
* [![Cloudinary][Cloudinary.com]][Cloudinary-url]
* [![Docker][Docker.com]][Docker-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

The following should be installe on your machine before running the application.

* ruby 3.0.5
* rails 7
* node 16+
* postgresql

You will also need a cloudinary account to be able to host your images.

### Installation

_Clone the application locally using the bewlow steps._

1. Clone the repo
   ```sh
   git clone https://github.com/abzedmohammed/tetish-inn.git
   ```
2. Change directory to the clonned application
   ```sh
   cd tetish inn
   ```
#### Frontend Setup
3. Change directory to frontend folder
   ```sh
   cd frontend
   ```
4. Install required packages
   ```sh
   npm install
   ```
#### Backend Setup
5. Change directory to backend folder
   ```sh
   cd backend
   ```
6. Install necessary packages
   ```sh
   bundle install
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Running App

To run this app locally, you need the following configurations.

### Backend

In the backend folder, create a `.env` file
   ```sh
   touch .env
   ```

Add the following to the file with replacing required fields with your own values
   ```sh
   export RAILS_ENV="development"
   export DATABASE_PASSWORD="YOUR_PASSWORD"
   export CLOUD_NAME="CLOUDINARY_NAME"
   export CLOUD_API_KEY="CLOUDINARY_KEY"
   export CLOUD_API_SECRET="CLOUDINARY_SECRET"
   ```

Source the file
   ```sh
   source .env
   ```
Run Server
   ```sh
   rails s
   ```

### Frontend

In the frontend folder, create a `.env` file
   ```sh
   touch .env
   ```

Add the following to the file with replacing required fields with your own values
   ```sh
   REACT_APP_TETISH_INN_BACKEND_URL="THE_PORT_WHICH_BACKEND_IS_RUNNING_ON"
   ```

Source the file
   ```sh
   source .env
   ```
Run Server
   ```sh
   npm start
   ```


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

<!-- Distributed under the MIT License. See `LICENSE.txt` for more information. -->
Not available

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Abzed Mohammed - ibraabzed@gmail.com

Project Link: [https://github.com/abzedmohammed/tetish-inn](https://github.com/abzedmohammed/tetish-inn)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
<!-- [contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt

[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com -->



[Cloudinary.com]: https://miro.medium.com/max/100/1*pLhqRKXZAmpJP4wpEPfM4w.png
[Cloudinary-url]: https://www.cloudinary.com 

[React.com]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[Tailwindcss.com]: https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/100px-Tailwind_CSS_Logo.svg.png
[Tailwind-url]: https://tailwindcss.com

[Rails.com]: https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Ruby_On_Rails_Logo.svg/100px-Ruby_On_Rails_Logo.svg.png
[Rails-url]: https://rubyonrails.org

[Docker.com]: https://www.cloudsavvyit.com/p/uploads/2021/04/075c8694.jpeg?height=50&width=100
[Docker-url]: https://www.docker.com

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/abzed-mohammed-630bb181/