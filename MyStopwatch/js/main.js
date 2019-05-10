'use strict';

{
  // 必要な要素を取得→定数に代入
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');

  let startTime;
  let timeoutId;
  let elapsedTime = 0;

  function countUp() {
    const d = new Date(elapsedTime + Date.now() - startTime);

    // 取得した値を分に変換して定数に代入
    const m = d.getMinutes();

    // 取得した値を秒に変換して定数に代入
    const s = d.getSeconds();

    // 取得した値をミリ秒に変換して代入
    const ms = d.getMilliseconds();

    // String()で数値を文字列に変換
    // padStart(2, '0')} はStringが２桁未満の場合、２桁になるように数値の左に０が追加される
    // 手短に言うと桁数を一定に保つためのメソッド
    timer.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;

    // 10mミリ秒後にまたcountUp()が呼び出される
    timeoutId = setTimeout(() => {
      countUp();
    }, 10);
  }

  // startだけが押せる状態(start前)
  function setButtonStateInitial() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.add('inactive');
  }

  // stopだけが押せる状態(タイマー稼働中)
  function setButtonStateRunning() {
    start.classList.add('inactive');
    stop.classList.remove('inactive');
    reset.classList.add('inactive');
  }

  // startとresetが押せる状態(stop中)
  function setButtonStateStopped() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.remove('inactive');
  }

  setButtonStateInitial();

  start.addEventListener('click', () => {
    // startにinactiveクラスが付いていたら処理が進まないように
    // これをしないとstartを連打した後にstop1回では止まらなくなる
    if (start.classList.contains('inactive') === true) {
      return;
    }

    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  });

  stop.addEventListener('click', () => {
    // stopにinactiveクラスが付いていたら処理が進まないように
    if (stop.classList.contains('inactive') === true) {
      return;
    }

    setButtonStateStopped();

    // timeoutId = countUpに設定したタイマーを解除
    clearTimeout(timeoutId);

    // タイマーが走っていた時間を保持して、再開した時に続きから始まるようにする
    // これをしないとstop→start時に0に戻ってしまう
    elapsedTime += Date.now() - startTime;
  });

  reset.addEventListener('click', () => {
    // resetにinactiveクラスが付いていたら処理が進まないように
    if (reset.classList.contains('inactive') === true) {
      return;
    }

    setButtonStateInitial();
    timer.textContent = '00:00.000';
    elapsedTime = 0;
  });
}
