import React, { useState } from 'react';
import SvgChevronDown from '../assets/icons/svgChevronDown';
import SvgQuestionMark from '../assets/icons/svgQuestionMark';

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from '@material-tailwind/react';

import { Fragment } from 'react';

const FaqSection = () => {
  const [open, setOpen] = useState(0);

  const handleOpen = (val) => {
    setOpen(open === val ? 0 : val);
  };

  const customAnimation = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
  };

  function Icon({ id, open }) {
    return (
      <SvgChevronDown
        className={`${
          id === open ? 'rotate-180' : ''
        } h-5 w-5 transition-transform text-gray-700 dark:text-gray-400`}
      />
    );
  }

  return (
    <section className="home__faq flex flex-col items-center m-14 max-md:m-8 text-white">
      <div className="home__top-titles flex flex-col text-center m-16 max-md:mx-8 max-md:my-0">
        <p className="text-5xl font-bold tracking-wide max-md:text-2xl">
          Frequently <span className="font-extrabold text-rose-500">asked</span>{' '}
          questions
        </p>
        <p className="m-5 text-lg text-gray-600 dark:text-gray-400 max-md:text-sm">
          Everything you need to know about the product and billing.
        </p>
      </div>
      <div className="mb-16 max-md:m-8 max-md:my-0 max-sm:mx-2">
        <Fragment>
          <Accordion
            className=" w-full max-w-[50rem]"
            open={open === 1}
            animate={customAnimation}
            icon={<Icon id={1} open={open} />}
          >
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="dark:border-b-[#303339] border-b-gray-300"
            >
              <div className="flex items-center text-1xl max-sm:text-base">
                <SvgQuestionMark className="fill-gray-700 dark:fill-gray-400 w-6 h-6 mr-2 shrink-0" />
                What is REWARDS CLUB?
              </div>
            </AccordionHeader>
            <AccordionBody className="text-[15px] text-gray-600 dark:text-gray-400">
              REWARDS CLUB is a project made by a group of 3 students of{' '}
              <a
                href="https://www.graphicerahilluniversity.com"
                target="_blank"
                rel="noreferrer"
                className="underline text-blue-600"
              >
                Graphic Era University
              </a>
              . The project was based on creating an FT Marketplace using
              ReactJS, Solidity, Tailwind, PostgreSQL & Prisma implementing
              Stripe API as the payments platform.
            </AccordionBody>
          </Accordion>
          <Accordion
            className="w-full max-w-[50rem]"
            open={open === 2}
            animate={customAnimation}
            icon={<Icon id={2} open={open} />}
          >
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className="dark:border-b-[#303339] border-b-gray-300"
            >
              <div className="flex items-center text-1xl max-sm:text-base">
                <SvgQuestionMark className="fill-gray-700 dark:fill-gray-400 w-6 h-6 mr-2 shrink-0" />
                What is a Club-Coin?
              </div>
            </AccordionHeader>
            <AccordionBody className="text-[15px] text-gray-600 dark:text-gray-400">
              A Club-Coin is a fungible token (FT) which is a unique digital identifier that is recorded in
              a blockchain, and that is used to certify authenticity and
              ownership. The ownership of an FT is recorded in the blockchain
              and can be transferred by the owner, allowing FTs to be 
              traded for rewards.
            </AccordionBody>
          </Accordion>
          <Accordion
            className="w-full max-w-[50rem]"
            open={open === 3}
            animate={customAnimation}
            icon={<Icon id={3} open={open} />}
          >
            <AccordionHeader
              onClick={() => handleOpen(3)}
              className="dark:border-b-[#303339] border-b-gray-300"
            >
              <div className="flex items-center text-1xl max-sm:text-base">
                <SvgQuestionMark className="fill-gray-700 dark:fill-gray-400 w-6 h-6 mr-2 shrink-0" />
                How can I earn more Club-Coin?
              </div>
            </AccordionHeader>
            <AccordionBody className="text-[15px] text-gray-600 dark:text-gray-400">
              First, you must create an account, then you can earn club-coins by products from our website, or by playing various games in the Games section. 
            </AccordionBody>
          </Accordion>
        </Fragment>
      </div>
    </section>
  );
};

export default FaqSection;