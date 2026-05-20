import React from 'react';
import MyResume from '../../../components/MyResume';

export default async function DynamicResumePage({ params }) {
  const { id } = await params;

  return (
    <div>
        <MyResume id={id} />
    </div>
  );
}
