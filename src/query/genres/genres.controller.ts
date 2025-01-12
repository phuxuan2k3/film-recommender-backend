import { Controller, Get } from '@nestjs/common';
import { GenresService } from './genres.service';

@Controller('genres')
export class GenresController {
    constructor(
        private readonly genresService: GenresService,
    ) { }

    @Get('all')
    async all() {
        return await this.genresService.all();
    }
}
