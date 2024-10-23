import { FormUtils } from '@schema-form/utils/form-utils';
import Cookies from 'js-cookie';

export const configs: any = ({
  height,
  currentAuthor,
  userAllowedToResolve,
  fontsizeFormats,
}) => ({
  height: height,
  relative_urls: false,
  remove_script_host: false,
  convert_urls: false,
  fontsize_formats: fontsizeFormats,
  menu: {
    tc: {
      title: 'Comments',
      items: 'addcomment showcomments deleteallconversations',
    },
  },
  toolbar:
    'undo redo | code | addcomment showcomments | bold italic underline strikethrough | fontselect | fontsizeselect | formatselect | alignleft aligncenter \
  alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap \
  emoticons | fullscreen  preview save | insertfile image media template link anchor codesample | ltr rtl',
  tinycomments_mode: 'embedded',
  tinycomments_author: currentAuthor,
  tinycomments_can_resolve: function (req, done, fail) {
    const allowed =
      req.comments.length > 0 && req.comments[0].author === currentAuthor;
    done({
      canResolve: allowed || currentAuthor === userAllowedToResolve,
    });
  },
  powerpaste_word_import: 'clean',
  powerpaste_html_import: 'clean',
  file_picker_types: 'image',
  file_picker_callback: function (cb, value, meta) {
    const input: any = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    input.onchange = async (e) => {
      const files = e.target.files;
      const file = files[0];
      const fileReader = new FileReader();

      fileReader.onload = async (progressEvent) => {
        const fd = new FormData();
        fd.append('file', file);
        const response = await fetch(
          FormUtils.getNodeEndpoint({
            nodeName: 'files',
          }),
          {
            body: fd,
            method: 'POST',
            headers: {
              Authorization: `Bearer ${Cookies.get('h2token')}`,
            },
          },
        );
        const responseData = await response.json();
        cb(responseData?.[0]?.url, { title: file.name });
      };
      fileReader.readAsDataURL(file);
    };
    input.click();
  },
  selector: 'textarea#open-source-plugins',
  plugins:
    'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
  editimage_cors_hosts: ['picsum.photos'],
  menubar: 'file edit view insert format tools table help',
  autosave_ask_before_unload: true,
  autosave_interval: '30s',
  autosave_prefix: '{path}{query}-{id}-',
  autosave_restore_when_empty: false,
  autosave_retention: '2m',
  image_advtab: true,
  // Todo: create link list
  link_list: [
    // { title: 'My page 1', value: 'https://www.tiny.cloud' },
    // { title: 'My page 2', value: 'http://www.moxiecode.com' },
  ],
  // Todo: Create Image list
  image_list: [
    // { title: 'My page 1', value: 'https://www.tiny.cloud' },
    // { title: 'My page 2', value: 'http://www.moxiecode.com' },
  ],
  image_class_list: [
    { title: 'None', value: '' },
    { title: 'Some class', value: 'class-name' },
  ],
  importcss_append: true,
  // Todo: Create template
  templates: [
    // { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
    // { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
    // { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' },
  ],
  template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
  template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
  image_caption: true,
  quickbars_selection_toolbar:
    'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
  noneditable_class: 'mceNonEditable',
  toolbar_mode: 'sliding',
  contextmenu: 'link image table',
  skin: 'oxide',
  content_css: 'default',
  content_style:
    'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
});

export const API_KEY = 'nnf218kpn0sa46p2p7hqrh808qr6x6lwrmplyj1jexnrzv0z';
