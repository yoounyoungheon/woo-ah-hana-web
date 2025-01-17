'use client';

import React from 'react';
import { Card } from '@/app/ui/molecule/card/card';
import IconTransfer from '../../assets/img/icon-transfer.png';
import IconPlan from '../../assets/img/icon-plan.png';
import IconMemory from '../../assets/img/icon-memory.png';
import IconManagement from '../../assets/img/icon-management.png';
import IconClosing from '../../assets/img/icon-closing.png';
import IconFeeCheck from '../../assets/img/icon-fee-check.png';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import useCommunityStore from '@/app/store/community-store';

type MenuItem = {
  label: React.ReactNode;
  icon: StaticImageData;
  onClick?: () => void;
};

export default function CardMenu(){
  const router = useRouter();
  const community = useCommunityStore((state) => state.community);

  const onClick = (menuKey: string) => {
    switch (menuKey) {
      case 'deposit':
        console.log('모임통장에 입금 클릭');
        router.push('/deposit');
        break;
      case 'management':
        console.log('내/모임 계좌관리 클릭');
        router.push('/account-management');
        break;
      case 'plan':
        console.log('모임 일정 둘러보기 클릭');
        router.push(`/plan?id=${community}`);
        break;
      case 'memory':
        console.log('지난 모임 추억 클릭');
        router.push('/memory');
        break;
      case 'closing':
        console.log('모임 결산 클릭');
        router.push('/closing');
        break;
      case 'fee-status':
        console.log('회비 입금 현황 클릭');
        router.push('/fee-status');
        break;
      default:
        console.error('잘못된 메뉴 선택');
    }
  };

  const menuItems: MenuItem[] = [
    {
      label: (
        <>
          모임통장에
          <br />
          입금
        </>
      ),
      icon: IconTransfer,
      onClick: () => onClick('deposit'),
    },
    {
      label: (
        <>
          내/모임
          <br />
          계좌관리
        </>
      ),
      icon: IconManagement,
      onClick: () => onClick('management'),
    },
    {
      label: (
        <>
          모임 일정
          <br />
          둘러보기
        </>
      ),
      icon: IconPlan,
      onClick: () => onClick('plan'),
    },
    {
      label: (
        <>
          지난
          <br />
          모임 추억
        </>
      ),
      icon: IconMemory,
      onClick: () => onClick('memory')
    },
    {
      label: <>모임 결산</>,
      icon: IconClosing,
      onClick: () => onClick('closing'),
    },
    {
      label: (
        <>
          회비
          <br />
          입금 현황
        </>
      ),
      icon: IconFeeCheck,
      onClick: () => onClick('fee-status'),
    },
  ];

  return (
    <div className='grid grid-cols-2 gap-5'>
      {menuItems.map((item, index) => (
        <Card
          key={index}
          onClick={item.onClick}
          className='aspect-square flex justify-between p-4 cursor-pointer shadow hover:shadow-lg transition'
        >
          <div className='flex flex-col w-full text-[20px]'>
            <div className='h-1/2'>{item.label}</div>
            <div className='h-1/2 flex justify-end items-end'>
              <Image src={item.icon} alt='입금아이콘' width={70} height={70} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};