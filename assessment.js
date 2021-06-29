'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
const playDivided = document.getElementById('play-area');
const playButton = document.getElementById('play');

playButton.addEventListener('mouseout', () => {
    playButton.style.backgroundColor = "green";
  });

  playButton.addEventListener('mouseover', () => {
    playButton.style.backgroundColor = "red";
  });

/**
 *  指定した要素の子供をすべて削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element){
    while(element.firstChild) {
        //子供の要素がある限り削除
        element.removeChild(element.firstChild);
    }
}

playButton.onclick =()=> {
    playButton.style.fontFamily = "HG行書体";
    const middle = document.createElement('h1');
    document.getElementById("play-area").style.color = "#red";
    middle.innerText = '押したんだな';
    playDivided.appendChild(middle);
}
assessmentButton.onclick =()=> {

    const userName = userNameInput.value;
    if(userName.length === 0) {
        //名前が空の時は処理を終了する
        return;
    }
    console.log(userName);
    //TODO 診断結果表示エリアの作成
    removeAllChildren(resultDivided);

    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const omiParagraph = document.createElement('h1');

    const result = assessment(userName);
    const omikujiResult = omikujiShuf();

    paragraph.innerText = result;
    omiParagraph.innerText = omikujiResult;
    resultDivided.appendChild(paragraph);
    resultDivided.appendChild(omiParagraph);
    //TODO ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 
    'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href',hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivided.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', 'http://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};

userNameInput.onkeydown = event => {
    if(event.key === 'Enter'){
        assessmentButton.onclick();
    }
}
const omikujis = [
    '大吉','吉','凶'
];

const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
    '{userName}のいいところは誇張した現実です。リアリティの右上から抜き足差し足で寄ってくる足音がとても素敵なので{userName}は全人類から評価されています。'
];
/**
 * 
 *  
 * @returns {string} 大吉など
 */

function omikujiShuf() {
    let num;
    num = Math.floor(Math.random() * 3);
    console.log(num);
    return omikujis[num] ;
}

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for(let i = 0; i < userName.length; i++){
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }
    //文字コードの番号の合計を回答の数で割って添え字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    //TODO {userName} をユーザーの名前に置き換える
    result = result.replaceAll('{userName}',userName);
    return result;
}







