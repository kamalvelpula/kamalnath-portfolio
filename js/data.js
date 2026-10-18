const portfolioData = {
  name: "Kamalnath Velpula",
  role: "Java Full Stack Developer",
  tagline: "Spring Boot | REST APIs | React.js",
  summary:
    "Java Full Stack Developer with hands-on experience building applications using Java, Spring Boot, Hibernate and MySQL. I love building clean RESTful APIs and responsive user interfaces.",
  location: "Bengaluru, India",
  email: "kamalnath645@gmail.com",
  phone: "+91 9966378413",
  photo: "images/profile.jpg",
  resume: "resume/Kamalnath_Velpula_Resume.pdf",
  linkedin: "https://www.linkedin.com/in/kamalnath-velpula-04bb4724b",
  github: "https://github.com/kamalvelpula",

  githubUsername: "kamalvelpula",
  leetcodeUsername: "Velpula_Kamal",
  leetcodeFallback: { solved: 384, easy: 103, medium: 218, hard: 63 },

  about: [
    "I'm a Java Full Stack Developer based in Bengaluru with hands-on experience from an internship and a trainee software engineer role. I build applications using Java, Spring Boot, Spring MVC, Hibernate and MySQL.",
    "I enjoy developing RESTful APIs, CRUD applications and clean layered architectures (Controller, Service, Repository). On the front end, I work with HTML, CSS, JavaScript, Bootstrap and React.js to create responsive interfaces.",
    "I have a strong foundation in OOP, Collections, Multithreading and relational database design, and I have solved 350+ DSA problems on LeetCode."
  ],

  stats: [
    { value: "1+", label: "Years Experience" },
    { value: "350+", label: "LeetCode Problems" },
    { value: "5+", label: "GitHub Projects" },
    { value: "4", label: "Forage Simulations" }
  ],

  skillBars: [
    { name: "Java", level: 90 },
    { name: "Spring Boot", level: 85 },
    { name: "Hibernate / JPA", level: 70 },
    { name: "MySQL", level: 85 },
    { name: "REST APIs", level: 70 },
    { name: "HTML / CSS / Bootstrap", level: 85 },
    { name: "JavaScript", level: 70 },
    { name: "React.js", level: 65 },
    { name: "Git / GitHub", level: 85 }
  ],

  skills: [
    {
      title: "Languages",
      icon: "bi-code-slash",
      items: ["Java", "Java 8", "SQL", "JavaScript (ES6)", "HTML5", "CSS3"]
    },
    {
      title: "Frameworks & Libraries",
      icon: "bi-boxes",
      items: ["Spring Boot", "Hibernate", "JPA", "JDBC", "Servlets", "JSP", "React.js", "Bootstrap", "jQuery"]
    },
    {
      title: "Web & API",
      icon: "bi-globe",
      items: ["RESTful Web Services", "MVC Architecture", "CRUD Operations", "Thymeleaf"]
    },
    {
      title: "Databases",
      icon: "bi-database",
      items: ["MySQL", "Oracle SQL"]
    },
    {
      title: "Tools & Platforms",
      icon: "bi-tools",
      items: ["Eclipse IDE", "VS Code", "Git", "GitHub", "Maven", "Spring Initializr", "Apache Tomcat", "Postman"]
    },
    {
      title: "Core Concepts",
      icon: "bi-cpu",
      items: ["OOP", "Collections", "Multithreading", "Exception Handling", "File Handling", "DSA"]
    }
  ],

  experience: [
    {
      role: "Independent Learning & Project Work",
      company: "Self-Driven",
      period: "Oct 2025 - Present",
      points: [
        "Strengthened Java, Spring Boot, REST API, Hibernate, JPA and MySQL skills through hands-on practice.",
        "Practiced building Java web applications with CRUD operations and database integration.",
        "Solved 350+ DSA problems on LeetCode."
      ]
    },
    {
      role: "Trainee Software Engineer",
      company: "PCS Global Pvt. Ltd., Bengaluru",
      period: "Mar 2025 - Sep 2025",
      points: [
        "Developed and optimized enterprise-level Java applications using Spring Boot and Hibernate.",
        "Designed and implemented RESTful APIs with full CRUD operations backed by MySQL.",
        "Implemented a layered Controller-Service-Repository architecture to improve maintainability and scalability.",
        "Built a Student Management System using JSP, Hibernate ORM and Spring MVC."
      ]
    },
    {
      role: "Software Engineering Virtual Experience",
      company: "Forage",
      period: "Feb 2025 - Mar 2025",
      points: [
        "Completed job simulations with Hewlett Packard Enterprise, Walmart USA, Skyscanner and Accenture North America."
      ]
    },
    {
      role: "Java Full Stack Web Developer Intern",
      company: "Main Flow Services and Technologies Pvt. Ltd.",
      period: "May 2024 - Aug 2024",
      points: [
        "Built full-stack applications by integrating Spring Boot REST APIs with front-end UI components.",
        "Implemented CRUD operations using JPA and MySQL for reliable data persistence.",
        "Designed responsive UI components using HTML5, CSS3, Bootstrap and JavaScript.",
        "Optimized backend performance through efficient database queries and modular, reusable code."
      ]
    }
  ],

  projects: [
    {
      title: "Student Management System",
      type: "CRUD + REST APIs",
      tags: ["Spring Boot", "REST API", "CRUD"],
      icon: "bi-mortarboard",
      description: [
        "Web application to manage student records end-to-end using Spring Boot.",
        "Full Create, Read, Update and Delete operations with MySQL integration.",
        "Improved efficiency of student record management for administrators and faculty."
      ],
      overview:
        "A web application that lets administrators and faculty manage student records from one place. It is built on Spring Boot with a layered architecture and MySQL for persistence.",
      features: [
        "Add, view, update and delete student records",
        "REST APIs for all CRUD operations",
        "MySQL database integration using Hibernate / JPA",
        "Responsive UI built with HTML, CSS and Bootstrap"
      ],
      learnings: [
        "Controller - Service - Repository layering",
        "Mapping entities to tables with Hibernate",
        "Designing clean REST endpoints"
      ],
      tech: ["Java", "Spring Boot", "Hibernate", "MySQL", "HTML", "CSS", "Bootstrap"],
      github: "https://github.com/kamalvelpula/student-management-system",
      live: ""
    },
    {
      title: "Employee Management System",
      type: "CRUD",
      tags: ["Spring Boot", "Thymeleaf", "CRUD"],
      icon: "bi-people",
      description: [
        "Employee module designed with Entity, Repository and Service layer separation.",
        "Thymeleaf/HTML integrated for a clean, user-friendly interface."
      ],
      overview:
        "An employee management module with clear Entity, Repository and Service separation, and a server-rendered UI using Thymeleaf.",
      features: [
        "Create, read, update and delete employees",
        "Thymeleaf templates for the user interface",
        "JPA repositories with MySQL",
        "Bootstrap styling for a clean layout"
      ],
      learnings: [
        "Server-side rendering with Thymeleaf",
        "Spring Data JPA repositories",
        "Separation of concerns in a Spring Boot app"
      ],
      tech: ["Java", "Spring Boot", "Hibernate", "MySQL", "JPA", "HTML", "CSS", "Bootstrap"],
      github: "https://github.com/kamalvelpula/employee-management-system",
      live: ""
    }
  ],

  education: [
    {
      degree: "B.Tech - Electrical and Electronics Engineering",
      school: "Narayana Engineering College, Nellore",
      period: "2020 - 2023"
    },
    {
      degree: "Diploma - Electrical and Electronics Engineering",
      school: "Sree Vidya Nikethan College, Tirupati",
      period: "2017 - 2020"
    }
  ],

  certifications: [
    "Java Full Stack Development - J Spiders (2023 - 2024)",
    "Java Full Stack Internship - Main Flow Services & Technologies (2024)",
    "HackerRank Certificate - Software Engineer (Aug 2024)",
    "Trainee Software Engineer Internship - PCS Global Pvt Ltd (2025)"
  ]
};