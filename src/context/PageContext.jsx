import React, { createContext, useContext, useEffect, useState } from 'react';


export const PageContext = createContext(null);

export const usePage = () => {
  const state = useContext(PageContext);
  if (state === undefined) {
    throw new Error('usePage must be used within a PageProvider');
  }
  return state;
};

