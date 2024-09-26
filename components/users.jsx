import Link from "next/link";

export default async function Users() {
  const { users } = await fetch("https://dummyjson.com/users").then((res) =>
    res.json()
  );

  return (
    <div>
      <div className="homepageContainer">
        <div className="homepageHeader">
          <h1>Welcome to the Ultimate User Hub</h1>
          <p>Discover comprehensive user profiles at your fingertips.</p>
        </div>

        <section className="introSection">
          <h2>Your Gateway to User Insights</h2>
          <p>
            Browse through detailed user profiles with a seamless experience,
            optimized for all devices.
          </p>
        </section>

        <section className="featuresSection">
          <div className="featureCard">
            <h2>Effortless Navigation</h2>
            <p>
              Quickly access and explore user profiles with a smooth interface
              designed for ease of use.
            </p>
          </div>
          <div className="featureCard">
            <h2>In-Depth User Details</h2>
            <p>
              Dive into rich user data, from personal details to contact
              information, all in one place.
            </p>
          </div>
          <div className="featureCard">
            <h2>Cross-Device Compatibility</h2>
            <p>
              Experience a responsive design that adapts to any device, ensuring
              a flawless browsing experience.
            </p>
          </div>
        </section>

        <footer className="homepageFooter">
          <p>
            &copy; 2024 Ultimate User Hub. Crafted with care for the modern web.
          </p>
        </footer>
      </div>
    </div>
  );
}
