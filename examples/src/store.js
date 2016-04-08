import ImmutableStore from './immutable-store';

const store = new ImmutableStore({
    simpleList: [1, 2, 3, 4, 5, 6],
    sharedGroup: {
        left: ['Apple', 'Banaba', 'Cherry', 'Grape'],
        right: ['Lemon', 'Orange', 'Pear', 'Peach']
    }
});

export default store;
