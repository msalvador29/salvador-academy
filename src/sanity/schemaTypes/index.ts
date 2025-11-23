import { type SchemaTypeDefinition } from 'sanity'

import { subjectType } from './subjectType'
import { strandType } from './strandType'
import { unitType } from './unitType' 
import { lessonType } from './lessonType'
import { successCriteriaType } from './successCriteriaType'
import { questionBankType } from './questionBankType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    subjectType,
    strandType,
    unitType,
    lessonType,
    successCriteriaType,
    questionBankType
  ],
}
