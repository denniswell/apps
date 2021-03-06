import { Module } from '@nestjs/common'
import { MockCentrifugeService } from '../mocks/centrifuge-client.mock'
import { CentrifugeService } from './centrifuge.service'

function checkNodeEnvironment() {
  switch (process.env.NODE_ENV) {
    case 'test': {
      return new MockCentrifugeService()
    }
  }
  return new CentrifugeService()
}

export const centrifugeServiceProvider = {
  provide: CentrifugeService,
  useValue: checkNodeEnvironment(),
}

@Module({
  providers: [centrifugeServiceProvider],
  exports: [centrifugeServiceProvider],
})
export class CentrifugeModule {}
