# Ride Ease - Frontend



This is the frontend repository for the Ride Ease, a full-stack application for a ride-booking platform similar to Uber or Pathao. This project is built using **React**, **Redux Toolkit**, and **RTK Query** to deliver a production-grade, fully responsive, and role-based user experience.

The frontend is designed to interact seamlessly with the Ride Management Backend API, providing distinct and polished interfaces for **Riders**, **Drivers**, and **Admins** across various devices.

***

##  Live Deployment

- **Frontend:** [Link to your live frontend deployment](https://ride-ease-app.vercel.app)
- **Backend:** [Link to your live backend deployment](https://ride-ease-psi.vercel.app)

***

##  Features

### Public Landing Pages

- **Home:** An engaging landing page with at least five distinct sections (Hero Banner, How-it-works, Service Highlights, Testimonials, Call-to-action).
- **About Us:** Details on the company's mission and team.
- **Features:** A detailed breakdown of capabilities for each user role (Rider, Driver, Admin).
- **Contact:** A validated form for user inquiries.
- **FAQ:** A searchable list of common questions.

### Authentication & Authorization

- **JWT-based Authentication:** Secure login and registration with role selection.
- **Role-based Access:** Redirects users to tailored dashboards upon login based on their role (Rider, Driver, Admin).
- **Persistent State:** Maintains user authentication across sessions.
- **Account Status Handling:**
  - **Blocked/Suspended Users:** Redirected to a dedicated status page.
  - **Offline Drivers:** Can access their dashboard but features related to ride acceptance are disabled, showing a notice to go online instead.

### Rider Features

- **Ride Request Form:** Input for pickup and destination, fare estimation, and payment method selection.
- **Ride History:** A paginated list with search and filter options.
- **Profile Management:** Update personal information and change password.

### Driver Features

- **Availability Control:** An "Online/Offline" toggle to manage ride requests.
- **Incoming Requests:** Accept or reject ride offers from riders.
- **Active Ride Management:** Update ride status (Accepted, Picked Up, In Transit, Completed, Cancelled).
- **Earnings Dashboard:** Visual breakdown of earnings (daily, weekly, monthly) using charts.
- **Ride History:** Filterable and paginated records of past rides.
- **Profile Management:** Update vehicle details and contact information.

### Admin Features

- **User Management:** Search, filter, block, or unblock riders and drivers.
- **Ride Oversight:** View all rides with advanced filtering by date, status, driver, or rider.
- **Analytics Dashboard:** Data visualizations for key metrics like ride volume and revenue trends.
- **Profile Management:** Update personal profile and password.

### General UI/UX Enhancements

- **Responsive Design:** Fully responsive layout for all device sizes.
- **Role-based Navigation:** Dynamic navigation menu and profile dropdown based on the user's role.
- **Performance:** Lazy-loading for heavy assets and skeleton loaders for a smooth user experience.
- **Emergency SOS Button:** A floating button visible during an active ride that allows users to call for help, notify emergency contacts, and share their live location.

***

## Tech Stack

- **Frontend Framework:** React
- **State Management:** Redux Toolkit, RTK Query
- **Routing:** React Router DOM
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Data Visualization:** recharts (optional)
- **Notifications:** react-hot-toast (optional)
- **API Communication:** Axios (optional)

***

## 🛠️ Setup Instructions

To get the project up and running locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/mahdirahman356/Ride-Ease-Frontend.git]
    cd [your-frontend-repo-name]
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```
4.  **Run the development server:**
    ```bash
    bun dev
    ```


The application will be accessible at `http://localhost:5173` (or the port specified in your console).

***


##  Demo Credentials

Use the following credentials to log in as an **Admin**.  
To explore **Driver** and **Rider** roles, please register a new account.

- **Admin:**
  - **Email:** `john.smith@example.com`
  - **Password:** `12345678`