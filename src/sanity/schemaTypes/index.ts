import { type SchemaTypeDefinition } from 'sanity'

// objects
import multipleChoiceOption from './objects/multipleChoiceOption'
import multipleChoiceOptionStringOnly from './objects/multipleChoiceOptionStringOnly'
import { tableOfValues } from './objects/tableOfValues'

// blocks
import { contentWithBlockMath } from './objects/contentWithBlockMath'
import { latexBlock } from './objects/latexBlock'
import { contentWithInlineMath } from './objects/contentWithInlineMath'
import { lessonContent } from './objects/lessonContent'
import { headerContent } from './objects/headerContent'

// types
import { subjectType } from './subjectType'
import { strandType } from './strandType'
import { unitType } from './unitType' 
import { lessonType } from './lessonType'
import { successCriteriaType } from './successCriteriaType'
import { questionBankType } from './questionBankType'
import { keyQuestionType } from './keyQuestionType'
import { multipleChoiceQuestionType } from './questions/multipleChoiceQuestionType'
import { numericalAnswerQuestionType } from './questions/numericalAnswerQuestionType'
import { multiPartQuestionType } from './questions/multiPartQuestionType'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // documents - content
    subjectType,
    strandType,
    unitType,
    lessonType,
    successCriteriaType,
    questionBankType,
    keyQuestionType,

    // documents - questions
    multipleChoiceQuestionType,
    numericalAnswerQuestionType,
    multiPartQuestionType,
    
    //objects
    multipleChoiceOption,
    multipleChoiceOptionStringOnly,
    contentWithBlockMath,
    contentWithInlineMath,
    latexBlock,
    tableOfValues,
    lessonContent,
    headerContent
  ],
}
