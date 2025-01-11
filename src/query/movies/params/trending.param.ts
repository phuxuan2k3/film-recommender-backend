import { IsString, IsIn } from 'class-validator';
import { PagingParam } from 'src/query/common/paging.param';

export class TrendingParam extends PagingParam {
    @IsString()
    @IsIn(['day', 'week'])
    time_window: string;
}