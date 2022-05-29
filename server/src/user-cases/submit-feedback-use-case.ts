import { MailAdapter } from './../adapters/mail-adapter';
import { FeedbackRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
 
  constructor(
    private feedbackRepository: FeedbackRepository,
    private mailAdapter: MailAdapter,
    )  { }

  async execute(request: SubmitFeedbackUseCaseRequest){
    const {type, comment, screenshot} = request;

    if(!type){
      throw new Error('Type is required');
    }

    if(!comment){
      throw new Error('Type is required');
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64')){
      throw new Error(`Invalid screenshot format.`)
    }

      await this.feedbackRepository.create({
        type, comment, screenshot,
      })

      await this.mailAdapter.sendMail({
        subject: 'New feedback',
        body:
        [
          `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
          `<p>Type of feedback: ${type} </>`,
          `<p>Comments: ${comment}`,
          screenshot ? `<img src="${screenshot} " />` : ``,
          `</div>`,
        ].join('\n')
      })
  }
}