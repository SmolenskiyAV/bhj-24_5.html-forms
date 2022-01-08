// ### Task 5.2 ###

//  helper function to create nodeArrays (not collections)
// функция формирования полноценного массива из коллекции элементов (parent.querySelectorAll(selector)). 
// This данной функции по умолчанию (её контекст) = document (вся страница).
const nodeArray = (selector, parent=document) => [].slice.call(parent.querySelectorAll(selector)); 

//  checkboxes of interest 
const allThings = nodeArray('input'); // массив всех узлов <input> данной страницы

//  global listener
addEventListener('change', e => { // обработка события клика на любой чекбокс окна браузера
  let check = e.target; // кликнутый чекбокс

  //  exit if change event did not come from 
  //  our list of allThings 
  if(allThings.indexOf(check) === -1) return; // выход из обработчика, если клик был сделан не по чекбоксу (я не ошибаюсь???)
  

  //  check/unchek children (includes check itself)
  const children = nodeArray('input', check.closest('label').parentNode);    // выбор всех чекбоксов-потомков текущего кликнутого, включая сам кликнутый чекбокс (я не ошибаюсь???)
  children.forEach(child => child.checked = check.checked);
  
  //  traverse up from target check
  while(check){
    
    //  find parent and sibling checkboxes (quick'n'dirty)
    const parent   = (check.closest(['ul']).parentNode).querySelector('input'); // "родитель" кликнутого чекбокса
    const siblings = nodeArray('input', parent.closest('li').querySelector(['ul'])); // массив "родных братьев" (чекбоксов одного с ним вложенного уровня) кликнутого чекбокса

    //  get checked state of siblings
    //  are every or some siblings checked (using Boolean as test function) 
    const checkStatus = siblings.map(check => check.checked); // массив всех "чекнутых"(помеченных) чекбоксов "родных братьев"
    const every  = checkStatus.every(Boolean); // ??? 'true' когда все "вложенные" чек-боксы одного уровня чекнуты ("колбаса" и "сыр", например)
    const some = checkStatus.some(Boolean);   // ???  НЕ МОГУ ПОНЯТЬ? 'true' только когда чекнуты "Еда", "Колбаса", "Сыр" - все одновременно или по отдельности в разном сочетании
    
    //  check parent if all siblings are checked
    //  set indeterminate if not all and not none are checked
    parent.checked = every;   // чекнуть родителя, если все "родные братья" (вложенные чекбоксы) чекнуты                      
    parent.indeterminate = !every && every !== some;    // пометить "неопределён" родителя, если чекнут один или более "родной брат", но не все (я не ошибаюсь???)

    //  prepare for nex loop
    check = check != parent ? parent : 0; // "подготовка к следующей петле(видимо, итерации цикла)?" - КАК ЭТО РАБОТАЕТ???
  }
})