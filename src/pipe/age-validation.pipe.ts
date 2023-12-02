import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class AgeValidationPipe implements PipeTransform<any> {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value.age) {
      throw new BadRequestException('Age is missing!');
    }
    const tranformedAge = parseInt(value.age, 10);
    // console.log('Pipe logger:', value);

    if (isNaN(tranformedAge)) {
      throw new BadRequestException('Age is not a number!');
    }

    if (Number(value.age) !== tranformedAge) {
      throw new BadRequestException('Age must be an integer!');
    }

    if (tranformedAge < 1 && tranformedAge > 99) {
      throw new BadRequestException('Age must greater 0 and smaller 100!');
    }

    return {
      ...value,
      age: tranformedAge,
    };
  }
}
