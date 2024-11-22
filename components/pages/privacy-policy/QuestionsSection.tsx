import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiQuestionMarkCircle } from 'react-icons/hi2';
import { RiArrowRightUpLine } from 'react-icons/ri';

const QuestionsSection = () => {
  return (
    <section id="contact" className="scroll-mt-24">
      <h2 className="font-serif text-3xl text-secondary-400 mb-8 flex items-center">
        <HiQuestionMarkCircle className="w-8 h-8 mr-3 text-secondary-400" />
        Questions or Concerns?
      </h2>
      <div className="bg-neutral-50 rounded-lg p-8 border-2 border-neutral-200">
        <p className="text-secondary-500 mb-4">
          If you have any questions about this Privacy Policy or our data practices, please don't hesitate to reach out to us.
        </p>
        <motion.div
          variants={{
            hover: {
              y: -2,
              transition: { type: "spring", stiffness: 400 }
            }
          }}
          whileHover="hover"
        >
          <Link
            href="/contact"
            className="text-secondary-500 hover:text-secondary-400 transition-colors
                     relative group text-sm inline-flex items-center"
          >
            <span className="relative">
              Contact us with your questions
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary-50 
                             transition-all duration-300 group-hover:w-full" />
            </span>
            <RiArrowRightUpLine className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 
                                         group-hover:ml-1 transition-all duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default QuestionsSection; 