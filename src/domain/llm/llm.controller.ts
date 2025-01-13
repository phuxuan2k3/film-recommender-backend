import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LlmService } from './services/llm.service';
import { LLMSearchQuery } from './param/llm-search.query';
import { NavigateBody } from './param/navigate.body';

@Controller('llm')
export class LlmController {
    constructor(
        private readonly llmService: LlmService
    ) { }

    @Get('ping')
    async ping() {
        return this.llmService.ping();
    }

    @Get('search')
    async search(@Query() query: LLMSearchQuery) {
        return this.llmService.llmQuerySearchMovies(query);
    }

    @Post('navigate')
    async navigate(@Body() body: NavigateBody) {
        return this.llmService.llmNavigate(body);
    }
}
