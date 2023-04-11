const accordionItems = document.querySelectorAll('.hs-accordion__item');

accordionItems.forEach(accordionItem => {
  const accordionButton = accordionItem.querySelector('button');

  accordionButton.addEventListener('click', () => {
    accordionItems.forEach(item => {
      const itemContent = item.querySelector('.hs-accordion__item-content');

      if (item !== accordionItem) {
        item.classList.remove('active');
        itemContent.classList.remove('active');
        itemContent.style.height = '0';
      }
    });

    const accordionContent = accordionItem.querySelector('.hs-accordion__item-content');

    if (accordionItem.classList.contains('active')) {
      accordionItem.classList.remove('active');
      accordionContent.classList.remove('active');
      accordionContent.style.height = '0';
    } else {
      accordionItem.classList.add('active');
      accordionContent.classList.add('active');
      accordionContent.style.height = accordionContent.scrollHeight + 'px';
    }
  });
});