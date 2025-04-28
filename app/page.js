"use client";
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="welcome-container">
      <div className="logo-container">
        <Image
          src="/Big Size.png"
          alt="Hospital Logo"
          width={200}
          height={200}
          className="logo"
        />
      </div>

      <h1 className="welcome-heading">Welcome to Legacy Clinics</h1>

      <p className="welcome-message">
        Your health is our priority. We are committed to providing the best care
        for you and your loved ones. Book an appointment today and experience
        world-class healthcare services.
      </p>

      <Link href="/homepage">
        <button className="explore-button">Explore and Book an Appointment</button>
      </Link>
    </div>
  );
}
