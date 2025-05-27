
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQSection = () => {
  const faqs = [
    {
      question: "How do I get started with CareShare?",
      answer: "Simply create an account, verify your email, and start browsing available items or post your own donations. It's completely free to use!"
    },
    {
      question: "Is CareShare available in my area?",
      answer: "We're currently available in 15 localities and expanding rapidly. Check our coverage area on the signup page to see if we serve your neighborhood."
    },
    {
      question: "How do I know items are safe and clean?",
      answer: "We encourage all users to follow our safety guidelines. Food items should be properly sealed and within expiration dates, while clothes should be clean and in good condition."
    },
    {
      question: "Can I request specific items I need?",
      answer: "Yes! You can post requests for specific items or help you need. Our community is very responsive to helping neighbors in need."
    },
    {
      question: "How do exchanges work?",
      answer: "Most exchanges are coordinated directly between users through our messaging system. You can arrange pickup times and locations that work for both parties."
    },
    {
      question: "Is there a limit to how much I can donate or receive?",
      answer: "There are no strict limits, but we encourage fair sharing so everyone in the community can benefit from the platform."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about using CareShare
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-emerald-100 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left font-semibold text-gray-800 hover:text-emerald-600">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
