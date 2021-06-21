import { useContext } from 'react';
import {
  SidebarDrawerContextData,
  SidebarDrawerContext,
} from '../contexts/SidebarDrawerContext';

export const useSidebarDrawer = (): SidebarDrawerContextData =>
  useContext(SidebarDrawerContext);
