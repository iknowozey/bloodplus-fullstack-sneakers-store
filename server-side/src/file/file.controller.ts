import {
  Controller,
  HttpCode,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/decorators/auth.decorator';
import { MaxFilesValidationPipe } from './pipes/max-files.validation.pipe';
import { UserRole } from 'generated/prisma';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @HttpCode(200)
  @UseInterceptors(FilesInterceptor('files'))
  @Auth(UserRole.ADMIN)
  @Post()
  async savingFiles(
    @UploadedFiles(new MaxFilesValidationPipe(3))
    files: Express.Multer.File[],
    @Query('folder') folder?: string,
  ) {
    return this.fileService.savingFiles(files, folder);
  }
}
