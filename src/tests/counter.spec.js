import { shallowMount } from '@vue/test-utils';
import Counter from '../template/components/Counter.vue';

test('初始標題文字 = 當前點擊次數0', () => {
  const wrapper = shallowMount(Counter);

  const title = wrapper.find('[data-testid="currentCounter"]');
  expect(title.text()).toBe('當前點擊次數10');
});