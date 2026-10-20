import { site } from '@/lib/site';
import { ContactForm } from './ContactForm';
import styles from './Contact.module.css';

export function Contact() {
  return (
    <section id="contact" className={`${styles.contact} section`} aria-labelledby="contact-title">
      <div className={`${styles.grid} wrap`}>
        <div className={styles.side}>
          <h2 id="contact-title" className="section-title">
            Tell us what you need to build
          </h2>
          <p>A few lines is enough to start: what you want to build, who it is for and when you need it.</p>
          <ul className={styles.direct}>
            <li>
              <span className="mono">Email</span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <span className="mono">Instagram</span>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer">
                {site.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
