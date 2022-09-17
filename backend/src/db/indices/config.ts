import { Container } from 'inversify';
import TYPES from './types';
import { NeighbouringToiletsIndex } from '.';

var injection_container = new Container();
injection_container
  .bind<NeighbouringToiletsIndex>(TYPES.NeighbouringToiletsIndex)
  .to(NeighbouringToiletsIndex)
  .inSingletonScope();

export default injection_container;
