"use client"
import { Card, CardBody } from '@nextui-org/react';
import React from 'react'
import Image from 'next/image';
import account from '@App/../../public/icons/account.png'
import './style.css'

function dashboard() {
  return (
    <div>
      <div className='wrapper items-start'>
        <div className='item-group'>
          <Card className='card'>
            <CardBody className='card-body'>
              <div className='grid-cols-3 grid-rows-1 grid '>
                <Image className='grid' src={account} alt='icon' width={25} height={25}></Image>
                <p className='grid col-span-2 px-2 '>body</p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default dashboard;