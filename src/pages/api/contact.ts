import type { APIRoute } from 'astro';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

// Static prerendering を無効化
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const name = data.get('name');
    const email = data.get('email');
    const title = data.get('title');
    const message = data.get('message');

    if (!name || !email || !message) {
      return new Response(JSON.stringify({
        error: '必須項目を入力してください。'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
      username: 'api',
      key: import.meta.env.MAILGUN_API_KEY,
    });

    // 管理者への通知メール
    await mg.messages.create(import.meta.env.MAILGUN_DOMAIN, {
      from: `${name} <${email}>`,
      to: import.meta.env.CONTACT_EMAIL,
      subject: title || `お問い合わせ: ${name}様より`,
      text: message,
      html: `
        <p><strong>名前:</strong> ${name}</p>
        <p><strong>メールアドレス:</strong> ${email}</p>
        <p><strong>タイトル:</strong> ${title || '未設定'}</p>
        <p><strong>メッセージ:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    // 自動返信メール
    await mg.messages.create(import.meta.env.MAILGUN_DOMAIN, {
      from: `${import.meta.env.SITE_NAME} <${import.meta.env.CONTACT_EMAIL}>`,
      to: email,
      subject: `【自動返信】お問い合わせを受け付けました`,
      html: `
        <p>${name} 様</p>
        
        <p>お問い合わせありがとうございます。<br>
        以下の内容で承りました。</p>
        
        <div style="margin: 20px 0; padding: 20px; background: #f5f5f5; border-radius: 5px;">
          <p><strong>タイトル:</strong> ${title || '未設定'}</p>
          <p><strong>お問い合わせ内容:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
        
        <p>内容を確認次第、改めてご連絡させていただきます。<br>
        しばらくお待ちくださいますようお願いいたします。</p>
        
        <hr style="margin: 30px 0;">
        
        <p style="font-size: 0.9em; color: #666;">
          ※このメールは自動送信されています。<br>
          このメールに返信いただいても回答できない場合がございます。
        </p>
      `
    });

    return new Response(JSON.stringify({
      message: 'お問い合わせを送信しました。自動返信メールをご確認ください。'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({
      error: 'エラーが発生しました。'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};