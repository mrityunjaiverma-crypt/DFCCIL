import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import './AboutPage.css';

const aboutData = {
  'society-overview': {
    title: 'Society Overview',
    content: (
      <>
        <h3>Our Core Mission</h3>
        <p>The DFCCIL Housing Society is dedicated to fostering a safe, comfortable, and world-class residential community for the employees of the Dedicated Freight Corridor Corporation of India Limited. Our mission goes beyond merely providing housing; we aim to cultivate a harmonious living environment where infrastructure and community well-being go hand in hand. By prioritizing sustainable development, we ensure that our residents and their families enjoy a high quality of life that reflects the values of DFCCIL.</p>
        
        <h3>Infrastructure & Community Living</h3>
        <p>Our residential sectors are meticulously planned and equipped with state-of-the-art infrastructure. From reliable water and electricity supply to seamless drainage systems and dedicated parking facilities, every operational detail is optimized for convenience. We place a special emphasis on green living, featuring beautifully landscaped parks and children’s play areas. Through regular cultural celebrations, sports activities, and environmental initiatives like tree plantation drives, we actively foster a strong, united community spirit.</p>
      </>
    )
  },
  'history': {
    title: 'History',
    content: (
      <>
        <h3>Our Foundation</h3>
        <p>The genesis of the DFCCIL Housing Society is deeply tied to the nation-building efforts of our parent organization. As DFCCIL rapidly expanded its operations across India to pioneer the Eastern and Western Dedicated Freight Corridors, the need for premium, secure residential facilities for its dedicated officers and staff became paramount. Driven by the collective vision of DFCCIL employees, the society was established to bridge this gap, ensuring that those building India’s logistical future had a modern, comfortable place to call home.</p>
        
        <h3>Growth & Milestones</h3>
        <p>Over the years, the society has grown steadily from a visionary concept into a thriving, fully realized community. This success is the result of systematic planning, transparent management, and the active, unwavering participation of our members. Today, the society stands as a testament to disciplined growth and mutual cooperation, continuously striving for excellence and sustainable expansion to meet the evolving needs of our growing DFCCIL family.</p>
      </>
    )
  },
  'management': {
    title: 'Management',
    content: (
      <>
        <h3>Democratic & Transparent Administration</h3>
        <p>The DFCCIL Housing Society operates on the foundational principles of cooperation, transparency, and democratic decision-making. Our day-to-day operations are overseen by a dedicated, elected Managing Committee comprising experienced residents who are deeply invested in the community's welfare. This committee expertly handles all aspects of administration, facility maintenance, and financial planning to ensure a seamless living experience for everyone.</p>
        
        <h3>Accountability & Continuous Improvement</h3>
        <p>To maintain the highest standards of governance, the management team conducts regular community meetings and rigorous financial audits. We believe that active member participation is the cornerstone of accountability. By encouraging open dialogue and collaborative problem-solving, the Managing Committee ensures continuous improvement in the society’s functioning, infrastructure upgrades, and welfare programs.</p>
      </>
    )
  },
  'corporate-office': {
    title: 'Corporate Office',
    content: (
      <>
        <h3>The Heart of Our Operations</h3>
        <p>Our Corporate Office serves as the administrative nerve center of the DFCCIL Housing Society. Designed to be both welcoming and highly efficient, the office is where our management team, administrative staff, and residents come together to shape the future of our community. It is fully equipped with modern administrative tools to handle resident queries, process maintenance requests, and plan community events with absolute efficiency.</p>
        
        <h3>Visitor Experience & Accessibility</h3>
        <p>Centrally located and easily accessible to all residents, the Corporate Office is a hub of transparency and support. Whether you are a new member seeking onboarding assistance or a long-time resident with a community proposal, our dedicated staff ensures a smooth, professional, and courteous experience. The office stands as a symbol of our open-door policy and our unwavering commitment to serving the DFCCIL family.</p>
      </>
    )
  },
  'field-units': {
    title: 'Field Units',
    content: (
      <>
        <h3>Decentralized Community Support</h3>
        <p>To ensure rapid response times and pristine maintenance across our expansive community, the DFCCIL Housing Society employs a network of decentralized Field Units. These units are strategically stationed across various residential blocks and infrastructure hubs. Staffed by our dedicated maintenance and security personnel, these localized teams ensure that everything from landscaping and cleanliness drives to electrical and plumbing maintenance is handled proactively.</p>
        
        <h3>On-the-Ground Excellence</h3>
        <p>Our Field Units act as the crucial anchor points for our daily operations. They are the first responders for facility management, directly engaging with residents to resolve on-the-ground issues. By maintaining a localized presence, these units guarantee that our commitment to safety, eco-friendly practices, and high-quality living is actively upheld in every corner of the society.</p>
      </>
    )
  },
  'board-of-directors': {
    title: 'Board of Directors',
    content: (
      <>
        <h3>Visionary Leadership</h3>
        <p>The Board of Directors for the DFCCIL Housing Society comprises visionary leaders and elected representatives drawn directly from the DFCCIL workforce. Bringing decades of combined experience in project management, engineering, administration, and finance, the Board provides strategic oversight for the society's long-term development. Their leadership ensures that the society remains financially robust, structurally sound, and aligned with the overarching ethos of DFCCIL.</p>
        
        <h3>Commitment to the Future</h3>
        <p>Our directors are not just administrators; they are pioneers dedicated to elevating the standard of living for all members. With a focus on sustainable expansion, transparent governance, and community enrichment, the Board continuously explores innovative solutions to modern housing challenges. Their tireless efforts guarantee that the DFCCIL Housing Society remains a model of excellence and a premier residential destination for generations to come.</p>
      </>
    )
  },
  'ongoing-projects': {
    title: 'Ongoing Projects',
    content: (
      <>
        <h3>Current Developments</h3>
        <p>The DFCCIL Housing Society is continuously expanding to meet the growing needs of our community. Our ongoing projects focus on developing new residential blocks, upgrading existing amenities, and enhancing our green infrastructure. We are currently implementing smart energy solutions and expanding our community centers to provide state-of-the-art recreational facilities.</p>
      </>
    )
  },
  'completed-projects': {
    title: 'Completed Projects',
    content: (
      <>
        <h3>A Legacy of Excellence</h3>
        <p>Over the years, we have successfully delivered numerous world-class residential phases. Our completed projects stand as a testament to our commitment to quality, timely delivery, and sustainable development. From fully functional drainage and water supply systems to beautifully landscaped parks and secured parking facilities, our completed infrastructure provides a highly comfortable living environment for all residents.</p>
      </>
    )
  },
  'tenders': {
    title: 'Tenders',
    content: (
      <>
        <h3>Procurement & Contracting</h3>
        <p>DFCCIL Housing Society ensures complete transparency in all its procurement and contracting processes. We regularly invite tenders from reputed vendors, contractors, and service providers for the maintenance, upgrade, and development of our housing infrastructure. All active tenders and procurement notices are published here to ensure a fair and competitive bidding process.</p>
      </>
    )
  },
  'opportunities': {
    title: 'Opportunities',
    content: (
      <>
        <h3>Join Our Ecosystem</h3>
        <p>We believe in collaborative growth and continuously seek opportunities to enhance our community living standards. Whether you are a local business looking to provide essential services to our residents, or an innovator with eco-friendly housing solutions, we offer a dynamic platform for engagement and mutual growth within our expansive residential network.</p>
      </>
    )
  },
  'partnerships': {
    title: 'Partnerships',
    content: (
      <>
        <h3>Strategic Alliances</h3>
        <p>The DFCCIL Housing Society actively collaborates with government bodies, environmental organizations, and private enterprises to bring the best amenities to our residents. Our strategic partnerships aim to introduce smart city technologies, sustainable waste management, and advanced security systems, ensuring that our society remains at the forefront of modern residential living.</p>
      </>
    )
  },
  'photo-gallery': {
    title: 'Photo Gallery',
    content: (
      <>
        <h3>Community in Pictures</h3>
        <p>Explore the vibrant life at DFCCIL Housing Society through our photo gallery. From festive cultural celebrations and sports events to our beautifully landscaped parks and modern infrastructure, our gallery captures the essence of our harmonious community living and the proud moments shared by our residents.</p>
      </>
    )
  },
  'news': {
    title: 'News & Updates',
    content: (
      <>
        <h3>Latest Announcements</h3>
        <p>Stay informed with the latest news and updates from the DFCCIL Housing Society. Here, we share important community announcements, upcoming event schedules, management decisions, and updates on our infrastructure projects. We are committed to keeping all members actively informed and engaged with the ongoing developments in our society.</p>
      </>
    )
  }
};

const AboutPage = () => {
  const { sectionId } = useParams();
  const section = aboutData[sectionId];

  if (!section) {
    return <Navigate to="/" />;
  }

  return (
    <div className="about-page-container">
      <div className="about-header">
        <h2>{section.title}</h2>
      </div>
      <div className="about-content">
        {section.content}
      </div>
    </div>
  );
};

export default AboutPage;
