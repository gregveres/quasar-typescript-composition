import * as EssentialLinkViewModel from './EssentialLinkViewModel'

describe('EssentialLinkViewModel tests', () => {
  let vm: EssentialLinkViewModel.Type;

  it('style is empty if fancy styles not selected', () => {
    // Act
    vm = EssentialLinkViewModel.create('label', 'url', false);
    // Assert
    expect(vm.style).toBe({});
  });
  it('transfromedString should be label set to lower case', () => {
    // Act
    vm = EssentialLinkViewModel.create('LABEL', 'url', false);
    // Assert
    expect(vm.transformedString).toBe('label');
  });
  it('transfromedUrl should be prepended with "quasar.dev"', () => {
    // Act
    vm = EssentialLinkViewModel.create('LABEL', 'url', false);
    // Assert
    expect(vm.transformedUrl).toBe('quasar.dev/url');
  });
});
