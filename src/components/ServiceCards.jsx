import { ServiceCard } from "./ui";

export default function ServiceCards() {
  return (
    <>
    <h1 className="mb-5 text-center text-2xl font-bold">AI-Powered Solutions for 21st Century Business Challenges</h1>
    <br />
    <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-center gap-9 pb-[80px] md:pb-[164px]">
      <ServiceCard
        title="Intelligent Business Analytics"
        imgSrc="/11.jpg"
      />
      <ServiceCard
        title=" AI-Enhanced Customer Experience"
        imgSrc="/2.jpg"
        description={
    
          <ul>
        <li className="flex items-center">➤ Intelligent chatbots and virtual assistants</li>
        <br />
        <li className="flex items-center">➤ Personalized recommendation engines</li>
        <br />
        <li className="flex items-center">➤  Emotion AI for customer sentiment analysis</li>
      </ul>
        }
      />
      <ServiceCard
        title="Smart Process Automation"
        imgSrc="/6.jpg"
        description={
    
          <ul>
        <li className="flex items-center">➤ AI-powered workflow optimization</li>
        <br />
        <li className="flex items-center">➤ Intelligent document processing</li>
        <br />
        <li className="flex items-center">➤  Robotic Process Automation (RPA) integration
        </li>
      </ul>
        }
      />
      <ServiceCard
        title="AI in Cybersecurity "
        imgSrc="/4.jpg"
        description={
    
          <ul>
        <li className="flex items-center">➤ Threat detection and prevention
        </li>
        <br />
        <li className="flex items-center">➤Anomaly detection in network traffic
        </li>
        <br />
        <li className="flex items-center">➤ AI-driven incident response systems
        </li>
      </ul>
        }
      />
      <ServiceCard
        title="Machine Learning Operations (MLOps)"
        imgSrc="/5.jpg"
        description={
    
          <ul>
        <li className="flex items-center">➤ End-to-end ML model lifecycle management</li>
        <br />
        <li className="flex items-center">➤ Automated model training and deployment</li>
        <br />
        <li className="flex items-center">➤  Continuous integration and delivery for ML
        </li>
      </ul>
        }
      />
      <ServiceCard
        title="Computer Vision Solutions"
        imgSrc="/7.jpg"
        description={
    
          <ul>
        <li className="flex items-center">➤ Image and video analysis for business insights</li>
        <br />
        <li className="flex items-center">➤ Object detection and recognition systems</li>
        <br />
        <li className="flex items-center">➤  AI-powered quality control in manufacturing
        </li>
      </ul>
        }
      />
     <ServiceCard
  title="Natural Language Processing (NLP) Applications"
  imgSrc="/8.jpg"
  description={
    <ul>
      <li className="flex items-center">➤ Sentiment analysis for brand monitoring</li>
      <br />
      <li className="flex items-center">➤ Automated content generation and curation</li>
      <br />
      <li className="flex items-center">➤ Multilingual support and translation services</li>
    </ul>
  }
/>

<ServiceCard
  title="AI-Driven Internet of Things (AIoT)"
  imgSrc="/9.jpg" // Assuming you have another image for AIoT
  description={
    <ul>
      <li className="flex items-center">➤ Smart device management and optimization</li>
      <br />
      <li className="flex items-center">➤ Predictive maintenance for industrial equipment</li>
      <br />
      <li className="flex items-center">➤ AI-enhanced edge computing solutions</li>
    </ul>
  }
/>

<ServiceCard
  title="Explainable AI (XAI) Implementation"
  imgSrc="/10.jpg" // Assuming you have another image for XAI
  description={
    <ul>
      <li className="flex items-center">➤ Transparent AI decision-making processes</li>
      <br />
      <li className="flex items-center">➤ AI ethics and bias mitigation strategies</li>
      <br />
      <li className="flex items-center">➤ Compliance with AI regulations</li>
    </ul>
  }
/>


    </div>
   
    </>
  );
}