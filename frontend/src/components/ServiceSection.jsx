import ServiceCard from './ServiceCard';

function ServiceSection() {
  return (
    <section className="bg-gradient-to-r from-indigo-50 via-indigo-100 to-indigo-200 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-indigo-900 mb-12">
          Our Premium Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          <ServiceCard 
            title="Consulting" 
            description="We offer expert consulting services to help your business grow and succeed."
          />
          <ServiceCard 
            title="Strategy" 
            description="Our strategic planning services ensure that your business stays ahead of the competition."
          />
          <ServiceCard 
            title="Support" 
            description="We provide ongoing support to help you solve any challenges you face."
          />
        </div>
      </div>
    </section>
  );
}

export default ServiceSection;
