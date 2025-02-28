<h1>Vehicle Service Management System</h1>

<p>A comprehensive web application for managing vehicle services, repairs, and payments. The system includes a Django backend, React frontend, and PostgreSQL database running via Docker.</p>

![1Main page](https://github.com/user-attachments/assets/08ca0456-a89f-4d32-b382-b5fffc6469b9)

---

<h2>Features</h2>
<ul>
  <li><b>Component Management</b>: Register, update, and manage components for repairs or purchases.</li>
  <li><b>Vehicle Repair Tracking</b>: Track repair status and details for vehicles.</li>
  <li><b>Issue Reporting</b>: Log issues, select components, and calculate repair costs.</li>
  <li><b>Payment Simulation</b>: Simulate payments and calculate total amounts for repairs.</li>
  <li><b>Revenue Visualization</b>: Analyze daily, monthly, and yearly revenue.</li>
</ul>

---

<h2>Tech Stack</h2>
<ul>
  <li><b>Backend</b>: Django (Python)</li>
  <li><b>Frontend</b>: React (JavaScript)</li>
  <li><b>Database</b>: PostgreSQL (via Docker)</li>
  <li><b>Additional Libraries</b>:
    <ul>
      <li><b>Backend</b>: Django REST Framework, django-cors-headers</li>
      <li><b>Frontend</b>: Axios, Recharts</li>
    </ul>
  </li>
</ul>

---

<h2>Prerequisites</h2>
<p>Ensure you have the following installed:</p>
<ul>
  <li><a href="https://www.python.org/">Python 3.10+</a></li>
  <li><a href="https://nodejs.org/">Node.js 18+</a></li>
  <li><a href="https://www.docker.com/">Docker</a></li>
  <li><a href="https://git-scm.com/">Git</a></li>
</ul>

---
<h2>Running the Application with Docker</h2>

<h3>Prerequisites</h3>
<ul>
  <li>Ensure you have Docker and Docker Compose installed on your machine.</li>
  <li>Clone the repository to your local machine:</li>
  <pre><code>git clone https://github.com/your-username/vehicle-service-management.git</code></pre>
</ul>

<h3>Steps to Run the Application</h3>
<ol>
  <li><strong>Navigate to the project directory:</strong>
    <pre><code>cd your-project</code></pre>
  </li>
  <li><strong>Build and start the Docker containers:</strong>
    <pre><code>docker-compose up --build</code></pre>
    This will:
    <ul>
      <li>Start the PostgreSQL database container.</li>
      <li>Start the Django backend container.</li>
      <li>Start the React frontend container.</li>
    </ul>
  </li>
  <li><strong>Access the application:</strong>
    <ul>
      <li><strong>React Frontend:</strong> <a href="http://localhost:5173" target="_blank">http://localhost:5173</a> (if running in development mode)</li>
      <li><strong>React Frontend (Production):</strong> <a href="http://localhost" target="_blank">http://localhost</a> (if using Nginx for production build)</li>
      <li><strong>Django Backend:</strong> <a href="http://localhost:8000" target="_blank">http://localhost:8000</a></li>
      <li><strong>PostgreSQL Database:</strong> Accessible on port <code>5432</code>.</li>
    </ul>
  </li>
</ol>

<h3>Stopping the Application</h3>
<p>To stop the running containers:</p>
<pre><code>docker-compose down</code></pre>

<h3>Managing the Database</h3>
<p>To access the PostgreSQL database from the host machine:</p>
<pre><code>psql -h localhost -p 5432 -U postgres -d vehicle_service_db</code></pre>
<p>Use the following credentials:</p>
<ul>
  <li><strong>Username:</strong> <code>postgres</code></li>
  <li><strong>Password:</strong> <code>VehiclePostgres@123</code></li>
</ul>

<h3>Rebuilding the Containers</h3>
<p>If you make changes to the code and need to rebuild the containers:</p>
<pre><code>docker-compose up --build</code></pre>

<h3>Docker Volumes</h3>
<p>The PostgreSQL data is stored in a Docker volume named <code>postgres_data</code>. This ensures that database data persists even if the container is stopped or recreated.</p>

<h3>Common Issues</h3>
<ul>
  <li>If the application does not start, check the container logs for errors:</li>
  <pre><code>docker logs <container_name></code></pre>
  <li>Ensure that the ports used in the application (e.g., <code>5173</code>, <code>8000</code>, <code>5432</code>) are not already in use on your host machine.</li>
</ul>
    
  ---
<h2>Installation and Running the Application Locally</h2>

<h3>1. Clone the Repository</h3>
<pre>
<code>
git clone https://github.com/your-username/vehicle-service-management.git
cd vehicle-service-management
</code>
</pre>

---

<h3>2. Backend Setup</h3>
<ol>
  <li><b>Navigate to the backend directory:</b></li>
  <pre><code>cd backend</code></pre>
  <li><b>Create a Python virtual environment:</b></li>
  <pre><code>
python -m venv venv
source venv/bin/activate  # On Windows, use venv\Scripts\activate
  </code></pre>
  <li><b>Install dependencies:</b></li>
  <pre><code>pip install -r requirements.txt</code></pre>
  <li><b>Set up the PostgreSQL database via Docker:</b></li>
  <pre><code>
docker run --name vehicle_service_db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=your_password -e POSTGRES_DB=vehicle_service -p 8010:5432 -d postgres
  </code></pre>
 
  <li><b>Run database migrations:</b></li>
  <pre><code>
python manage.py makemigrations
python manage.py migrate
  </code></pre>
  <li><b>Start the Django development server:</b></li>
  <pre><code>python manage.py runserver</code></pre>
</ol>

<p>The backend will run at <a href="http://127.0.0.1:8000/">http://127.0.0.1:8000/</a>.</p>

---

<h3>3. Frontend Setup</h3>
<ol>
  <li><b>Navigate to the frontend directory:</b></li>
  <pre><code>cd ../frontend</code></pre>
  <li><b>Install dependencies:</b></li>
  <pre><code>npm install</code></pre>
  <li><b>Start the React development server:</b></li>
  <pre><code>npm run dev</code></pre>
</ol>

<p>The frontend will run at <a href="http://localhost:5173/">http://localhost:5173/</a>.</p>

---

<h3>4. Access the Application</h3>
<ul>
  <li><b>Frontend</b>: <a href="http://localhost:5173/">http://localhost:5173</a></li>
  <li><b>Backend API</b>: <a href="http://127.0.0.1:8000/">http://127.0.0.1:8000</a></li>
</ul>

---



<h2>Usage</h2>

<h3>1. Component Management</h3>
<p>Add, update, or delete components for vehicle repairs. Use this feature to manage the inventory of parts and their pricing for repairs or replacements.</p>

<h3>2. Vehicle Management</h3>
<p>Register vehicles, log their details, and track their repair statuses. Monitor the status as <i>Pending</i>, <i>In Progress</i>, or <i>Completed</i> based on the repair workflow.</p>

<h3>3. Repair Management</h3>
<p>Log repair jobs for registered vehicles. Calculate the total costs for each repair based on the selected components and labor charges.</p>

<h3>4. Simulate Payments</h3>
<p>Simulate payments for one or more repairs. This feature calculates the total amount due and processes a mock payment, allowing you to track payment details for each repair.</p>

<h3>5. Revenue Analytics</h3>
<p>Visualize revenue trends through graphs. Analyze daily, monthly, and yearly revenue generated from repair and service payments.</p>


---


