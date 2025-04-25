import React from 'react';
import { Star, StarHalf } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah J.',
      role: 'Founder, EcoTech Solutions',
      image: 'https://randomuser.me/api/portraits/women/32.jpg',
      testimonial: 'IdeaScope helped me transform my sustainable tech idea into a comprehensive business plan. I secured $1.2M in seed funding within 3 months of using the platform.',
      rating: 5
    },
    {
      name: 'David L.',
      role: 'CEO, HealthConnect',
      image: 'https://randomuser.me/api/portraits/men/43.jpg',
      testimonial: 'The financial projections and pitch deck we created through StartupLaunch gave us credibility with investors. Our angel round was oversubscribed thanks to the professional materials.',
      rating: 5
    },
    {
      name: 'Michelle K.',
      role: 'Founder, EdTech Innovators',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      testimonial: 'As a non-technical founder, I was struggling with the financial modeling. StartupLaunch made it easy and gave me insights I hadn\'t considered. Now we\'re partnered with three major universities.',
      rating: 4.5
    }
  ];

  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-5 w-5 text-yellow-400 fill-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-5 w-5 text-yellow-400 fill-yellow-400" />);
    }

    return stars;
  };

  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Success Stories</h2>
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-neutral-900 sm:text-4xl font-heading">
            Founders Who Succeeded With Us
          </p>
          <p className="mt-4 max-w-2xl text-xl text-neutral-500 mx-auto">
            See how StartupLaunch helped these founders secure funding and build successful companies.
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-neutral-50 rounded-lg p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12">
                    <img 
                      className="h-12 w-12 rounded-full" 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-neutral-900">{testimonial.name}</h4>
                    <p className="text-sm text-neutral-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-base italic text-neutral-600">"{testimonial.testimonial}"</p>
                </div>
                <div className="mt-4 flex">
                  {renderRating(testimonial.rating)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
