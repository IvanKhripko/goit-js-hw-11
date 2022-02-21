export default class LoadMoreBtn {
    constructor({selector, hiddden = false}) {
        this.refs = this.getRefs(selector);

        if(hiddden) {
            this.hide();
        }
    }


getRefs(selector) {
    // console.log('ref', selector);
    const refs = {};
    refs.button = document.querySelector(selector);
    refs.label = refs.button.querySelector('.label');
    refs.spinner = refs.button.querySelector('.spinner');

    return refs;
}

enable() {
    this.refs.button.disabled = false;
    this.refs.label.textContent = 'Load more';
    this.refs.spinner.classList.add('is-hidden');
}

disable() {
    this.refs.button.disabled = true;
    this.refs.label.textContent = 'Loading...';
    this.refs.spinner.classList.remove('is-hidden');
}

show() {
    this.refs.button.classList.remove('is-hidden');
}

hide() {
    this.refs.button.classList.add('is-hidden');
}
}