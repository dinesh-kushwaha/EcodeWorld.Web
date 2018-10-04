
import { ECWModule } from './ecw.model';

export class SharedModel extends ECWModule {
    userName: string;
    isAuthenticated: boolean;
    authenticationToken: string;
}