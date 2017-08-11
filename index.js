const {
    show
} = require('core.inspect');

const {
    fromNullable
} = require('data.maybe')


describe('Access a two-dimensional Array', () => {
    const twoDimensional = [ [ 42 ] ];
    describe('usually, you would access a value in an two-dimensional array like this:', () => {
        it('you would simply access it by indices', () => {
            expect(twoDimensional[0][0]).toBe(42);
        });
    });
    describe('but the array might be empty as well', () => {
        describe('so we want to access the row as Maybe.', () => {
            let maybeRow;
            beforeEach(() => {
                maybeRow = fromNullable(twoDimensional[0]);
            });

            it('the output of "show" seems to be a little bit awkward here', () => {
                expect(show(10, maybeRow)).toEqual('Maybe.Just(42)');
            });

            it('but if you access the value itself, you get what you expected', () => {
                expect(show(10, maybeRow.get())).toEqual('[42]');
            });

            describe('But if you need to dig deeper to access the value inside the list', () => {
                describe('we thought simply mapping over it would be enough...', () => {
                    let maybeColumn;
                    beforeEach(() => {
                        maybeColumn = maybeRow.map((oneDimensional) => {
                            return fromNullable(oneDimensional[0]);
                        });
                    });
                    it('But it fact this will produce the Maybe.Just(Maybe.Just(42)) we could not imagine.', () => {
                        expect(show(10, maybeColumn)).toEqual('Maybe.Just(Maybe.Just(42))');
                    });

                    it('The implementation of folktale allows the access, but this is not how you should use a maybe.', () => {
                        expect(show(10, maybeColumn.get().get())).toEqual('42');
                    });

                    it('These are the operations that are available on folktales maybe.', () => {
                        let members = [];
                        for(var key in maybeColumn) {
                            members.push(key);
                        }
                        expect(members.sort()).toEqual([
                            'value',
                            'isJust',
                            'ap',
                            'map',
                            'chain',
                            'toString',
                            'isEqual',
                            'get',
                            'getOrElse',
                            'orElse',
                            'cata',
                            'toJSON',
                            'Nothing',
                            'Just',
                            'fromNullable',
                            'fromEither',
                            'fromValidation',
                            'isNothing',
                            'of'
                        ].sort());
                    });

                    it('Do you have an idea by what operation I can flatmap this Maybe.just(Maybe.just(42)) to a Maybe.just(42)?', () => {
                        let oneLevelMaybe = pending();
                        expect(show(10, oneLevelMaybe)).toEqual('Maybe.Just(42)');
                    });
                });
            });
        });
    });
});
